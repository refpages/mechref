## NAVBAR

import os

def change_links(css):
    links_to_replace = {
        "url(/fonts/source-sans-pro/SourceSansPro-Regular.otf": "url(../fonts/source-sans-pro/SourceSansPro-Regular.otf",
        "url(/fonts/source-sans-pro/SourceSansPro-Semibold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Semibold.otf",
        "url(/fonts/source-sans-pro/SourceSansPro-Bold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Bold.otf",
        "url(/fonts/Montserrat-Bold.ttf": "url(../fonts/Montserrat-Bold.ttf"
    }

    for file in css:
        name = os.path.join('./dist/_astro', file)

        with open(name, 'r') as f:
            data = f.read()

        for wrong, correct in links_to_replace.items():
            data = data.replace(wrong, correct)
        
        with open(name, 'w') as f:
            f.write(data)

    return