import os
import re

def change_links(home, scripts, links, courses, special_rewrites):
    all_content_pages = []
    links_to_replace = {'\"/\"': '\"../index.html\"'}

    for l in links:
        links_to_replace[f"href=\"{l['href']}\""] = f"href=\"..{l['href']}\""

    for s in scripts:
        if 'https://' in s['src']: continue
        links_to_replace[f"src=\"{s['src']}\""] = f"src=\"..{s['src']}\""

    for c in courses:
        links_to_replace[f"href=\"/{c}\""] = f"href=\"../{c}.html\""
        links_to_replace[f"src=\"/{c}/"] = f"src=\"../{c}/"
        links_to_replace[f"href=\"/{c}/"] = f"href=\"../{c}/"

        for p in os.listdir(os.path.join(home, c)):
            if p[-5:] == '.html': all_content_pages.append(os.path.join(c, p))

    asset_dirs = [d for d in os.listdir(home)
                  if os.path.isdir(os.path.join(home, d))
                  and d not in courses + ['_astro']]
    for d in asset_dirs:
        links_to_replace[f"src=\"/{d}/"] = f"src=\"../{d}/"
        links_to_replace[f"href=\"/{d}/"] = f"href=\"../{d}/"

    for k, v in special_rewrites.items():
        links_to_replace[k] = v

    internal_pages = {'href="../'+p.replace('.html', '')+'"': 'href="../'+p+'"' for p in all_content_pages}

    for dir in courses:
        pages = [p for p in os.listdir(os.path.join(home, dir)) if p[-5:] == '.html']
        for page in pages:
            print(os.path.join(dir, page))
            with open(os.path.join(home, os.path.join(dir, page)), 'r', encoding='utf8') as file:
                data = file.read()

            for wrong, correct in links_to_replace.items():
                data = data.replace(wrong, correct)

            for wrong, correct in internal_pages.items():
                data = data.replace(wrong, correct)

            page_name = page.replace('.html', '')
            data = re.sub(
                r'(src|href)="(?!http)(?!\.\.)(?!\.)(?![a-zA-Z][\w\+\-\.]*://)([^/"]+\.(jpg|jpeg|png|gif|svg|webp|mp4|csv|json))"',
                rf'\1="{page_name}/\2"',
                data
            )
            data = re.sub(r'src="/((?!http)[^"]+)"', r'src="../\1"', data)
            data = re.sub(r'href="/((?!http|#)[^"]+)"', r'href="../\1"', data)

            with open(os.path.join(home, os.path.join(dir, page)), 'w', encoding='utf8') as file:
                file.write(data)
    return