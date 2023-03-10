from django.views.decorators.http import require_http_methods
from .models import Service, Technician
from django.http import JsonResponse
import json


from .encoders import (
    ServiceListEncoder,
    TechnicianListEncoder,
)


@require_http_methods(["GET", "POST"])
def list_tech(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians}, encoder=TechnicianListEncoder, safe=False
        )
    else:

        try:
            content = json.loads(request.body)
            new_technician = Technician.objects.create(**content)
            return JsonResponse(
                new_technician, encoder=TechnicianListEncoder, safe=False
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)


@require_http_methods(["GET", "DELETE"])
def show_tech(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(technician, encoder=TechnicianListEncoder, safe=False)
    else:
        try:
            count, _ = Technician.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse({"deleted": "Does not exist"})


@require_http_methods(["GET", "POST"])
def list_service(request):
    if request.method == "GET":
        services = Service.objects.all()
        return JsonResponse(
            {"services": services}, encoder=ServiceListEncoder, safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)
        appointment = Service.objects.create(**content)
        return JsonResponse(appointment, encoder=ServiceListEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def detail_service(request, id):
    if request.method == "GET":
        service = Service.objects.get(id=id)
        return JsonResponse(service, encoder=ServiceListEncoder, safe=False)
    if request.method == "PUT":
        service = Service.objects.get(id=id)
        content = json.loads(request.body)
        if "completed" in content:
            service.completed = content["completed"]
        if "vip" in content:
            service.vip = content["vip"]
        service.save()

        return JsonResponse(service, encoder=ServiceListEncoder, safe=False)
    else:
        try:
            count, _ = Service.objects.filter(id=id).delete()
            return JsonResponse(
                {"deleted": count > 0},
            )
        except Service.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET"])
def service_history(request):
    history = Service.objects.all()
    return JsonResponse({"history": history}, encoder=ServiceListEncoder, safe=False)
