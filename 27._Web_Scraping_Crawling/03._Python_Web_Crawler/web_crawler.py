import requests
from bs4 import BeautifulSoup # parser så vi kan navigere i HTML-strukturen
import re
# Ved hjælp af BeautifulSoup omdanner vi HTML-dokumentet til en struktur, der kan parses, hvilket betyder, at vi kan navigere i og udtrække specifik information fra HTML

# pip install beautifulsoup4
# pip install lxml 


# Basis-URL for Wikipedia
BASE_URL = "https://en.wikipedia.org"

# Set til at holde styr på besøgte sider
visited_pages = set()

# Liste til sider, der skal besøges
to_visit_queue = []

def get_parsed_wiki_page(endpoint):
    # Henter og parser HTML-indholdet fra url på linja 38
    html_page = requests.get(BASE_URL + endpoint).text
    return BeautifulSoup(html_page, "lxml")

def get_internal_wiki_link_tags(parsed_page):
    # Finder interne Wikipedia-links på en parsed side
    return parsed_page.find('div', { "id": "bodyContent" }).find_all('a', href=re.compile("^(/wiki/)((?!:).)*$"))

def add_tags_in_visiting_queue(link_tags):
    # Tilføjer fundne links til køen af sider, der skal besøges
    if link_tags is None:
        return []

    new_queue = []
    for link_tag in link_tags:
        if "href" in link_tag.attrs:
            internal_link = link_tag.attrs["href"]
            if internal_link not in visited_pages and internal_link not in to_visit_queue:
                new_queue.append(internal_link)
    return new_queue

# Start: Besøg "/wiki/Monty_Python"
parsed_root_page = get_parsed_wiki_page("/wiki/Monty_Python")

# Find Links: Find alle interne links på "/wiki/Monty_Python"
root_internal_links = get_internal_wiki_link_tags(parsed_root_page)

# Tilføj Links til Køen: Tilføj disse links til køen to_visit_queue
to_visit_queue = add_tags_in_visiting_queue(root_internal_links)

# Loop:
while to_visit_queue:
    new_temp_visit_queue = []
    for link_to_visit in to_visit_queue:
        # Besøg den næste side i køen
        print(link_to_visit)
        parsed_page = get_parsed_wiki_page(link_to_visit)
        
        # Find interne links på denne side
        internal_links = get_internal_wiki_link_tags(parsed_page)
        
        # Tilføj nye links til køen
        new_temp_visit_queue += add_tags_in_visiting_queue(internal_links)
        
        # Markér den nuværende side som besøgt
        visited_pages.add(link_to_visit)
    
    # Gentag Loopet: Fortsæt indtil køen er tom
    to_visit_queue = new_temp_visit_queue

# Udskriv Resultat: Print alle besøgte sider
print(visited_pages)
