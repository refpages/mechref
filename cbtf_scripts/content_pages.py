###
# THIS CORRECTS LINKS FOR COURSE CONTENT PAGES
# INCLUDES LINKS TO .js FILES, .css FILES, 
# LINKS TO INTERNAL MECHREF PAGES
###

import os

def change_links(home, scripts, links, courses, special_rewrites):
    all_content_pages = []
    links_to_replace = {'\"/\"': '\"../index.html\"'}

    for l in links:
        links_to_replace[f"href=\"{l['href']}\""] = f"href=\"..{l['href']}\""

    for s in scripts:
        if 'https://' in s['src']: continue
        links_to_replace[f"src=\"{s['src']}\""] = f"src=\"..{s['src']}\""

    for c in courses:
        links_to_replace[f"href=\"/{c}\""] = f"href=\"/{c}\""
        links_to_replace[f"src=\"/{c}/"] = f"src=\"../{c}/"
        links_to_replace[f"href=\"/{c}/"] = f"href=\"../{c}/"

        for p in os.listdir(os.path.join(home, c)):
            if p[-5:] == '.html': all_content_pages.append(os.path.join(c, p))

    for k, v in special_rewrites.items():
        links_to_replace[k] = v

    # UPDATE LINKS THAT REDIRECT TO ANOTHER MECHREF PAGE
    internal_pages ={'href="../'+p.replace('.html', '')+'"': 'href="../'+p+'"' for p in all_content_pages}

    for dir in courses:
        pages = [p for p in os.listdir(os.path.join(home, dir)) if p[-5:] == '.html']
        for page in pages:
            print(os.path.join(dir, page))
            with open(os.path.join(home, os.path.join(dir, page)), 'r') as file:
                data = file.read()

            for wrong, correct in links_to_replace.items():
                data = data.replace(wrong, correct)

            for wrong, correct in internal_pages.items():
                data = data.replace(wrong, correct)

            data = data.replace(f"{page.replace('.html', '')}/canvases.js", f"{page.replace('.html', '')}.js")
            
            with open(os.path.join(home, os.path.join(dir, page)), 'w') as file:
                file.write(data)        

    return