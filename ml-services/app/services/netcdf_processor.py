import xarray as xr
import pandas as pd
import numpy as np
from fastapi import UploadFile
import tempfile
import os
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class NetCDFProcessor:
    """Service for processing ARGO NetCDF files"""
    
    def __init__(self):
        self.supported_parameters = [
            'TEMP', 'PSAL', 'PRES', 'DOXY', 'CHLA', 'BBP700', 'PH_IN_SITU_TOTAL',
            'NITRATE', 'DOXY_ADJUSTED', 'TEMP_ADJUSTED', 'PSAL_ADJUSTED'
        ]
    
    async def process_file(self, file: UploadFile) -> Dict[str, Any]:
        """Process uploaded NetCDF file and extract ARGO data"""
        try:
            # Save uploaded file temporarily
            with tempfile.NamedTemporaryFile(delete=False, suffix='.nc') as tmp_file:
                content = await file.read()
                tmp_file.write(content)
                tmp_file_path = tmp_file.name
            
            try:
                # Open and process NetCDF file
                dataset = xr.open_dataset(tmp_file_path)
                
                # Extract metadata
                metadata = self._extract_metadata(dataset)
                
                # Extract profile data
                profiles = self._extract_profiles(dataset)
                
                # Extract trajectory data
                trajectory = self._extract_trajectory(dataset)
                
                # Close dataset
                dataset.close()
                
                return {
                    "success": True,
                    "metadata": metadata,
                    "profiles": profiles,
                    "trajectory": trajectory,
                    "message": f"Successfully processed {len(profiles)} profiles"
                }
                
            finally:
                # Clean up temporary file
                os.unlink(tmp_file_path)
                
        except Exception as e:
            logger.error(f"Error processing NetCDF file: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "message": "Failed to process NetCDF file"
            }
    
    def _extract_metadata(self, dataset: xr.Dataset) -> Dict[str, Any]:
        """Extract metadata from NetCDF dataset"""
        try:
            metadata = {
                "platform_number": str(dataset.attrs.get("platform_number", "")),
                "institution": str(dataset.attrs.get("institution", "")),
                "source": str(dataset.attrs.get("source", "")),
                "date_creation": str(dataset.attrs.get("date_creation", "")),
                "data_mode": str(dataset.attrs.get("data_mode", "")),
                "format_version": str(dataset.attrs.get("format_version", "")),
                "dimensions": dict(dataset.dims),
                "variables": list(dataset.variables.keys())
            }
            
            # Add float-specific metadata if available
            if "PLATFORM_NUMBER" in dataset.variables:
                metadata["float_id"] = str(dataset["PLATFORM_NUMBER"].values[0])
            
            if "PROJECT_NAME" in dataset.variables:
                metadata["project"] = str(dataset["PROJECT_NAME"].values[0])
                
            return metadata
            
        except Exception as e:
            logger.error(f"Error extracting metadata: {str(e)}")
            return {}
    
    def _extract_profiles(self, dataset: xr.Dataset) -> List[Dict[str, Any]]:
        """Extract profile data from NetCDF dataset"""
        try:
            profiles = []
            
            # Get number of profiles
            n_prof = dataset.dims.get("N_PROF", 0)
            n_levels = dataset.dims.get("N_LEVELS", 0)
            
            for prof_idx in range(n_prof):
                profile = {
                    "profile_id": prof_idx,
                    "date": None,
                    "latitude": None,
                    "longitude": None,
                    "measurements": {}
                }
                
                # Extract position and time
                if "LATITUDE" in dataset.variables:
                    profile["latitude"] = float(dataset["LATITUDE"].values[prof_idx])
                
                if "LONGITUDE" in dataset.variables:
                    profile["longitude"] = float(dataset["LONGITUDE"].values[prof_idx])
                
                if "JULD" in dataset.variables:
                    # Convert Julian day to datetime
                    juld = dataset["JULD"].values[prof_idx]
                    if not np.isnan(juld):
                        # ARGO uses days since 1950-01-01
                        base_date = pd.Timestamp("1950-01-01")
                        profile["date"] = str(base_date + pd.Timedelta(days=juld))
                
                # Extract measurement parameters
                for param in self.supported_parameters:
                    if param in dataset.variables:
                        values = dataset[param].values[prof_idx, :]
                        
                        # Filter out fill values (typically -999 or NaN)
                        valid_mask = ~np.isnan(values) & (values != -999)
                        
                        if np.any(valid_mask):
                            profile["measurements"][param] = {
                                "values": values[valid_mask].tolist(),
                                "pressure": dataset["PRES"].values[prof_idx, valid_mask].tolist() if "PRES" in dataset.variables else [],
                                "qc_flags": dataset.get(f"{param}_QC", dataset.get("PROFILE_PRES_QC", None))
                            }
                
                profiles.append(profile)
            
            return profiles
            
        except Exception as e:
            logger.error(f"Error extracting profiles: {str(e)}")
            return []
    
    def _extract_trajectory(self, dataset: xr.Dataset) -> Dict[str, Any]:
        """Extract trajectory data from NetCDF dataset"""
        try:
            trajectory = {
                "coordinates": [],
                "dates": [],
                "float_id": None
            }
            
            if "LATITUDE" in dataset.variables and "LONGITUDE" in dataset.variables:
                lats = dataset["LATITUDE"].values
                lons = dataset["LONGITUDE"].values
                
                # Remove invalid coordinates
                valid_mask = ~np.isnan(lats) & ~np.isnan(lons)
                
                trajectory["coordinates"] = [
                    [float(lon), float(lat)] 
                    for lat, lon in zip(lats[valid_mask], lons[valid_mask])
                ]
                
                if "JULD" in dataset.variables:
                    dates = dataset["JULD"].values[valid_mask]
                    base_date = pd.Timestamp("1950-01-01")
                    trajectory["dates"] = [
                        str(base_date + pd.Timedelta(days=float(d))) 
                        for d in dates if not np.isnan(d)
                    ]
            
            if "PLATFORM_NUMBER" in dataset.variables:
                trajectory["float_id"] = str(dataset["PLATFORM_NUMBER"].values[0])
            
            return trajectory
            
        except Exception as e:
            logger.error(f"Error extracting trajectory: {str(e)}")
            return {}
    
    def validate_netcdf(self, file_path: str) -> bool:
        """Validate if file is a proper NetCDF file"""
        try:
            dataset = xr.open_dataset(file_path)
            dataset.close()
            return True
        except Exception:
            return False