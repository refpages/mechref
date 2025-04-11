###
# THIS CORRECTS LINKS FOR MAIN PAGES (COURSE HOME PAGES + MECHREF HOME PAGE)
# INCLUDES LINKS TO .js FILES, .css FILES, 
# LINKS TO INTERNAL MECHREF PAGES
###

import os

def change_links(home, scripts, links, courses, special_rewrites):
    all_content_pages = []
    links_to_replace = {'\"/\"': '\"./index.html\"', '?origin=coursemenu': '.html'}

    for l in links:
        links_to_replace[f"href=\"{l['href']}\""] = f"href=\".{l['href']}\""

    for s in scripts:
        if 'https://' in s['src']: continue
        links_to_replace[f"src=\"{s['src']}\""] = f"src=\".{s['src']}\""

    for c in courses:
        links_to_replace[f"href=\"/{c}\""] = f"href=\"/{c}\""
        links_to_replace[f"src=\"/{c}/"] = f"src=\"./{c}/"
        links_to_replace[f"href=\"/{c}/"] = f"href=\"./{c}/"

        for p in os.listdir(os.path.join(home, c)):
            if p[-5:] == '.html': all_content_pages.append(os.path.join(c, p))

    for k, v in special_rewrites.items():
        links_to_replace[k] = v
    
    for page in ['index.html'] + [f'{c}.html' for c in courses]:
        print(os.path.join(page))

        with open(os.path.join(home, page), 'r') as file:
            data = file.read()

        for wrong, correct in links_to_replace.items():
            data = data.replace(wrong, correct)
        
        with open(os.path.join(home, page), 'w') as file:
            file.write(data)  

    ## REPLACING HOME PAGE LOGOS AND LINKS TO OTHER PAGES
    with open(os.path.join(home, 'index.html'), 'r') as file:
        data = file.read()  

    for c in courses:
        data = data.replace(f'\"/{c}\"', f'\"./{c}.html\"')

    for logo in os.listdir(os.path.join(home, 'home_page')):
        data = data.replace(f'\"/home_page/{logo}\"', f'\"./home_page/{logo}\"')

    with open(os.path.join(home, 'index.html'), 'w') as file:
        file.write(data) 

    return