from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class NominationBase(BaseModel):
    name: str
    unit_name: str
    contesting_for: str
    education_qualification: str

class NominationCreate(NominationBase):
    # File handling is usually separate in FastAPI (UploadFile), 
    # but we might store path here after upload
    pass 

class NominationUpdate(BaseModel):
    status: str

class Nomination(NominationBase):
    id: int
    noc_file_path: Optional[str] = None
    created_at: datetime
    status: str

    class Config:
        orm_mode = True
