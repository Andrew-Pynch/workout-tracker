import requests

r = requests.get('http://localhost:3000/exercises')

print(f'Status Code: {r.status_code}')
print(f'Headers: {r.headers}')
print(f'Text: {r.text}')