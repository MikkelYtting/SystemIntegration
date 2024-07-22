import json

# Python dic objekt 
python_object = {
    "name": "John Doe",
    "age": 30,
    "is_student": False,
    "courses": ["Math", "Science"]
}

# Serialiserer Python objektet til en JSON-streng
json_string = json.dumps(python_object)

# Gemmer JSON-strengen i en fil
with open("data.json", "w") as file:
    file.write(json_string)

print("Python object serialized to JSON successfully.")
