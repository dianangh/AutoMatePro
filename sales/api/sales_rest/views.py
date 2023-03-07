from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Customer, SalesPerson, SaleRecord


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "sold",
        "id",
    ]


class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "sales_person",
        "customer",
        "automobile",
        "price",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        print("sales person line 59 ----->", sales_person)
        return JsonResponse (
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        print("this is the content line 67 ---->", content)

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
            print("sales person line 106---->", sales_person)
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
            print("sales person line 118---->", sales_person)
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
            print("sales person line 113 ----->", sales_person)
            content = json.loads(request.body)
            print("content line 115 ----->", content)
            sales_person.name = content["name"]
            print("sales person line 117 ----->", sales_person.name)
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
        print("customer line 131 ----->", customer)
        return JsonResponse (
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        print("this is the content line 138---->", content)

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
            print("customer line 160---->", customer)
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
            print("customer line 173---->", customer)
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
            print("customer line 184 ----->", customer)
            content = json.loads(request.body)
            print("content line 186 ----->", content)
            customer.name = content["name"]
            print("customer name line 188 ----->", customer.name)
            customer.address = content["address"]
            print("customer address line 190 ----->", customer.address)
            customer.phone_number = content["phone_number"]
            print("customer phone_number line 191 ----->", customer.phone_number)
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
        print("sales_record line 205 ----->", sales_record)
        return JsonResponse (
            {"sales_record": sales_record},
            encoder=SaleRecordEncoder,
        )
    else:
        content = json.loads(request.body)
        print("this is the content line 213---->", content)

        try:



        # try:
        #     sales_record = SaleRecord.objects.create(**content)
        # except Exception as e:
        #     return JsonResponse(
        #         {"message": str(e)},
        #         status=400
        #     )

        # return JsonResponse (
        #     {"sales_record": sales_record},
        #     encoder=SaleRecord,
        #     safe=False,
        # )
