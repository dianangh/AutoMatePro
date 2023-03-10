from common.json import ModelEncoder

from .models import AutomobileVO, Service, Technician, ServiceRecordVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "vip",
    ]


class ServiceRecordVO(ModelEncoder):
    model = ServiceRecordVO
    properties = ["vin"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["technician_name", "employee_number", "id"]


class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "id",
        "vin",
        "name",
        "appointment_date",
        "reason",
        "completed",
        "vip",
        "technician",
    ]
    encoders = {
        "technician": TechnicianListEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
