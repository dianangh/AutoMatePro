import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import ServiceRecordVO


def get_serviceRecord():
    response = requests.get('http://sales-api:8000/api/salesrecords/')
    content = json.loads(response.content)
    for sr in content['sales_record']:
        ServiceRecordVO.objects.update_or_create(
            vin=sr["automobile"]["vin"],
        )


def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_serviceRecord()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
