import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO


def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print("response poller line 17: -----> ", response)
    content = json.loads(response.content)
    print("content poller line 19: -----> ", content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            import_href=automobile["import_href"],
            vin=automobile["vin"],
            sold=automobile["sold"]
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobile()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
