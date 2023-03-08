from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Customer, SalesPerson, SaleRecord
from .encoders import SalesPersonEncoder, CustomerEncoder, AutomobileVOEncoder, SaleRecordEncoder
import json

@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse (
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            sales_person = SalesPerson.objects.create(**content)
        except Exception as e:
            return JsonResponse(
                {"message": str(e)},
                status=400
            )

        return JsonResponse (
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(pk=pk)
            return JsonResponse(
                {"sales_person": sales_person},
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales Person id is not in the system"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(pk=pk)
            sales_person.delete()
            return JsonResponse(
                {"message": "Sales Person deleted successfully"},
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales person id is not in the system"})
    elif request.method == "PUT":
        try:
            sales_person = SalesPerson.objects.get(pk=pk)
            content = json.loads(request.body)
            sales_person.name = content["name"]
            sales_person.employee_number = content["employee_number"]
            sales_person.save()
            return JsonResponse(
                {"message": "Sales Person updated successfully"},
                safe=False,
            )
        except (SalesPerson.DoesNotExist, KeyError):
            return JsonResponse({"message": "Sales person id is not in the system or invalid request data"})


@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse (
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            customer = Customer.objects.create(**content)
        except Exception as e:
            return JsonResponse(
                {"message": str(e)},
                status=400
            )

        return JsonResponse (
            {"customer": customer},
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(pk=pk)
            return JsonResponse(
                {"customer": customer},
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer is not in the system"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(pk=pk)
            customer.delete()
            return JsonResponse(
                {"message": "customer deleted successfully"},
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer is not in the system"})
    elif request.method == "PUT":
        try:
            customer = Customer.objects.get(pk=pk)
            content = json.loads(request.body)
            customer.name = content["name"]
            customer.address = content["address"]
            customer.phone_number = content["phone_number"]
            customer.save()
            return JsonResponse(
                {"message": "Customer updated successfully"},
                safe=False,
            )
        except (SalesPerson.DoesNotExist, KeyError):
            return JsonResponse({"message": "Customer is not in the system or invalid request data"})


@require_http_methods(["GET", "POST"])
def api_list_sales_records(request):
    if request.method == "GET":
        sales_record = SaleRecord.objects.all()
        return JsonResponse (
            {"sales_record": sales_record},
            encoder=SaleRecordEncoder,
        )
    else:
        content = json.loads(request.body)

        try:

            automobile = AutomobileVO.objects.get(vin=content["automobile"], sold=False)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Vin number"},
                status=400,
            )

        try:
            sales_person = SalesPerson.objects.get(id=content["sales_person"])
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales person"},
                status=400,
            )
        try:
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )

        if SaleRecord.objects.filter(automobile=content["automobile"]).exists():
            return JsonResponse(
                {"message": "A sales record already exists for this automobile"},
                status=400,
            )
        else:
            sales_record = SaleRecord.objects.create(**content)
            return JsonResponse (
                sales_record,
                encoder=SaleRecordEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_records(request, pk):
    if request.method == "GET":
        try:
            sales_record = SaleRecord.objects.get(pk=pk)
            return JsonResponse(
                {"sales_record": sales_record},
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except (SaleRecord.DoesNotExist, KeyError):
            return JsonResponse(
                {"message": "Sales record is not in the system"},
                status=400,
            )

    elif request.method == "DELETE":
        try:
            sales_record = SaleRecord.objects.get(pk=pk)
            sales_record.delete()
            return JsonResponse(
                {"message": "Sales record deleted successfully"},
                safe=False,
            )
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Customer is not in the system"}
            )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if "sales_record" in content:
                sales_record = SaleRecord.objects.get(pk=pk)
                content["sales_record"] = sales_record
        except SaleRecord.DoesNotExist:
            return JsonResponse(
                {"message": "Sales record does not exist"},
                status=400
            )
        SaleRecord.objects.filter(id=pk).update(**content)
        sales_record = SaleRecord.objects.get(id=pk)

        return JsonResponse(
            sales_record,
            encoder=SaleRecordEncoder,
            safe=False
        )
