import shutil
import os
from pathlib import PurePath
from bs4 import BeautifulSoup

import cbtf_scripts.utils as utils
import cbtf_scripts.navbar as navbar
import cbtf_scripts.content_pages as content_pages
import cbtf_scripts.main_pages as main_pages

courses = ['sta', 'sol', 'dyn', 'mf', 'md', 'thermodynamics']

with open('./src/layouts/Layout.astro', 'r') as f:
    soup = BeautifulSoup(f.read(), features="html.parser")

scripts =  soup.find_all('script', src=True)
links = soup.find_all('link', href=True)

banned_dirs = [
    'Dynamics',
    'Solid_Mechanics',
    'Statics',
    'mathjax',
    'static',
    '_astro'
]

# MOVES AND RENAMES FILES FROM <course>/<page>/index.html TO <course>/<page>.html
# AND <course>/<page>/canvases.js TO <course>/<page>.js 

home = os.path.join(os.getcwd(), 'dist')
utils.explore_dir_and_move(home, '', banned_dirs)

## NAVBAR
_astro = os.listdir('./dist/_astro')

css = [c for c in _astro if c[-4:] == '.css']
js = [j for j in _astro if j[-3:] == '.js']

navbar.change_links(css)

## PAGES WITH CONTENT

special_rewrites = {
    "href=\"${e['item']['link']}\"": "href=\"..${e['item']['link']}\"",
    "url(/fonts/source-sans-pro/SourceSansPro-Regular.otf": "url(../fonts/source-sans-pro/SourceSansPro-Regular.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Semibold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Semibold.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Bold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Bold.otf",
    "url(/fonts/Montserrat-Bold.ttf": "url(../fonts/Montserrat-Bold.ttf",
    '.html/canvases': '',
    "../dyn/particle_kinetics.html/particle_kinetics.html.js": "../dyn/particle_kinetics.js",
    "../dyn/particle_kinetics.html/particle_kinetics.html.js": "../dyn/particle_kinetics.js",
    "../dyn/vectors.html/worldCoastlineCompressed.js": './worldCoastlineCompressed.js',
    "../dyn/vectors.html/py_triples.js": "./py_triples.js",
    "?origin=sidebar": f'.html',
    'vectors.html_scalars.html': 'vectors_scalars.html',
    "vectors.html_scalars.js": "vectors_scalars.js",
    "stress.html_transformation": "stress_transformation.html",
    "stress_transformation.html.html": "stress_transformation.html",
    "<script src=\"/static/js/themes.js\">": "<script src=\"../static/js/themes.js\">",
    'path_components = path.split("../index.html")': 'path_components = path.split("/")',
    "$(location).prop(\'href\', \"../index.html\"+$(this).attr(\"class-value\"));":"$(location).prop(\'href\', \"../\"+$(this).attr(\"class-value\")+\".html\");"
}

for cs in css:
    special_rewrites[f"href=\"/_astro/{cs}\""] = f"href=\"../_astro/{cs}\""

content_pages.change_links(home, scripts, links, courses, special_rewrites)

## COURSE HOME PAGES

special_rewrites = {
    f"href=\"/_astro/{css[0]}\"": f"href=\"./_astro/{css[0]}\"",

    "href=\"${e['item']['link']}\"": "href=\".${e['item']['link']}\"",
    "url(/fonts/source-sans-pro/SourceSansPro-Regular.otf": "url(./fonts/source-sans-pro/SourceSansPro-Regular.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Semibold.otf": "url(./fonts/source-sans-pro/SourceSansPro-Semibold.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Bold.otf": "url(./fonts/source-sans-pro/SourceSansPro-Bold.otf",
    "url(/fonts/Montserrat-Bold.ttf": "url(./fonts/Montserrat-Bold.ttf",
    "?origin=sidebar": f'.html',
    "<script src=\"/static/js/themes.js\">": "<script src=\"./static/js/themes.js\">",
    'path_components = path.split("./index.html")': 'path_components = path.split("/")',
    "$(location).prop(\'href\', \"./index.html\"+$(this).attr(\"class-value\"));":"$(location).prop(\'href\', \"./\"+$(this).attr(\"class-value\")+\".html\");"
}

for cs in css:
    special_rewrites[f"href=\"/_astro/{cs}\""] = f"href=\"./_astro/{cs}\""

main_pages.change_links(home, scripts, links, courses, special_rewrites)

        
        