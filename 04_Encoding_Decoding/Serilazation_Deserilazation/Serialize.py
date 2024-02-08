import json

# Python object (e.g., a dictionary)
python_object = {
    "name": "John Doe",
    "age": 30,
    "is_student": False,
    "courses": ["Math", "Science"]
}

# Serialize the Python object to a JSON string
json_string = json.dumps(python_object)

# Save the JSON string to a file
with open("data.json", "w") as file:
    file.write(json_string)

print("Python object serialized to JSON successfully.")
