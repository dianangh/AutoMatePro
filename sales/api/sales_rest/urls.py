from django.urls import path
from .views import (api_list_salesperson, api_show_salesperson,
                    api_list_customer, api_show_customer, api_list_sales_records
                    )

urlpatterns = [
    path("salesperson/", api_list_salesperson, name="api_list_salesperson"),
    path("salesperson/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customers/", api_list_customer, name="api_list_customer"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salesrecords/", api_list_sales_records, name="api_list_sales_records"),
    # path("salesperson/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    # path("customer/", api_list_customers, name="api_list_customers"),
    # path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    # path("sale/", api_list_sales, name="api_list_sales"),
    # path("sale/<int:pk>/", api_show_sale, name="api_show_sale"),

]
