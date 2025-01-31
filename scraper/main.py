import requests, json
from bs4 import BeautifulSoup

URL = "https://www.sekaipedia.org/wiki/Song_data_list"

# Fake user agent so we can scrape the data
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
}

'''
data = [{
        "jacket": "https://url.com",
        "name": "Call boy",
        "producer": "syudou",
        "unit": "VBS"
    },
    {
        "jacket": "https://url.com",
        "name": "(Not) a devil",
        "producer": {"deco", "pino"},
        "unit": "vsing"
    }
]
'''
data = []

page = requests.get(URL, headers=headers)
soup = BeautifulSoup(page.content, "html.parser")

table = soup.find(class_="wikitable") # Find table
main_table = table.find(name="tbody")
table_elements = main_table.find_all(name="tr")
del table_elements[0]

# Clean up data
counter = 0
for element in table_elements:
    curr_element_children = element.find_all(name="td")
    del curr_element_children[0]
    curr_element_children = curr_element_children[:7]

    table_elements[counter] = curr_element_children
    counter += 1

# Cache data
for element in table_elements:
    data.append({
        "jacket": "https:" + element[0].find(name="img")['srcset'].split(" ")[2],
        "name": element[1].text,
        "link": "https://www.sekaipedia.org" + element[1].find(name="a")['href'],
        "producer": [p.text for p in element[2].find("ul")],
        "unit": [u.text for u in element[3].find("ul")],
        "bpm": element[4].text,
        "duration": element[5].text,
        "release": element[6].text
    })

# Write the data to a file
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)
