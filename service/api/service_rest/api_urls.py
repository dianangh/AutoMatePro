from django.urls import path
from .api_views import list_service, list_tech, show_tech, detail_service, service_history

urlpatterns = [
    path("technician/", list_tech, name="list_tech"),
    path("technician/<int:id>/", show_tech, name="show_tech"),
    path("service/", list_service, name="list_service"),
    path("service/<int:id>/", detail_service, name="detail_service"),
    path("service/history/", service_history, name="service_history")
]
