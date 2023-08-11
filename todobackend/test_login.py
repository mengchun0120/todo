from http import client
import json

host = "127.0.0.1"
conn = client.HTTPConnection(host, port=8000)
req = {
    "username": "mengchun",
    "password": "luse1_09"
}
conn.request("POST", "/api/login/", body=json.dumps(req))
response = conn.getresponse()
print(f"status={response.status}, body={response.read()}")
