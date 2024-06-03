import requests
from bs4 import BeautifulSoup #  Ved hjælp af BeautifulSoup omdanner vi HTML-dokumentet til en struktur, der kan parses, hvilket betyder, at vi kan navigere i og udtrække specifik information fra HTML.
                              #  det giver dig mulighed for at udtrække specifikke oplysninger fra HTML-dokumentet, som f.eks. links, tekst og andre elementer.
from pprint import pprint

# pip install beautifulsoup4
# pip install lxml 

# Hent HTML-indholdet fra Wikipedia-siden
html = requests.get("https://en.wikipedia.org/wiki/List_of_Monty_Python_projects").text

# Parser HTML-indholdet med BeautifulSoup
html_parsed = BeautifulSoup(html, features="lxml")

# Find den specifikke div med indholdet
tags = html_parsed.find("div", { "class": "mw-parser-output" }) # på Wikipedia-sider er "mw-parser-output" classen, som typisk omslutter hovedindholdet af artiklen.


projects = {}

current_category = None

# Gennemgå tags for at organisere projekter efter kategori
for tag in tags:
    if tag.name == "h2": # Hvis et tag er en <h2>, antager vi, at det repræsenterer en ny kategori.
        current_category = tag.text.replace("[edit]", "")
        projects[current_category] = []
    elif tag.name == "ul":
        for li in tag.find_all("li"):
            projects[current_category].append(li.text)

# Fjern uønskede kategorier
del projects["References"]
del projects["Notes"]
del projects["Further reading"]

# Udskriv de organiserede projekter
pprint(projects)




