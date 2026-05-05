import shutil
import os
import re
from pathlib import PurePath
from bs4 import BeautifulSoup

import cbtf_scripts.utils as utils
import cbtf_scripts.navbar as navbar
import cbtf_scripts.content_pages as content_pages
import cbtf_scripts.main_pages as main_pages
import subprocess

for folder in ["dist", ".astro", os.path.join("node_modules", ".astro")]:
    if os.path.exists(folder):
        shutil.rmtree(folder)

subprocess.run(["npm", "run", "astro", "build"], check=True)

courses = ['sta', 'sol', 'dyn', 'mf', 'md', 'thermodynamics']

with open('./src/layouts/Layout.astro', 'r') as f:
    soup = BeautifulSoup(f.read(), features="html.parser")

scripts = soup.find_all('script', src=True)
links = soup.find_all('link', href=True)

banned_dirs = [
    'Dynamics',
    'Solid_Mechanics',
    'Statics',
    'mathjax',
    'static',
    '_astro'
]

home = os.path.join(os.getcwd(), 'dist')
utils.explore_dir_and_move(home, '', banned_dirs)
utils.fix_canvases_js_paths(home, courses)

## NAVBAR
_astro = os.listdir('./dist/_astro')

css = [c for c in _astro if c[-4:] == '.css']
js = [j for j in _astro if j[-3:] == '.js']

navbar.change_links(css)

def fix_extensionless_links(filepath, course_prefix='..'):
    """
    Finds href links pointing to course pages that are missing .html extension
    and adds it. Handles patterns like href="../sta/page" or href="./sta/page"
    """
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    course_pattern = '|'.join(courses)

    # e.g. href="../sta/track_and_field_starting_blocks"
    # but NOT href="../sta/something.html" or href="../sta/something.js" etc.
    pattern = re.compile(
        r'(href=["\'])(\.\./|\./)(' + course_pattern + r')/([^"\'#?]+?)(#[^"\']*)?(["\'])'
    )

    def add_html_ext(m):
        prefix = m.group(1)
        dotdot = m.group(2)
        course = m.group(3)
        page = m.group(4)
        anchor = m.group(5) or ''
        quote = m.group(6)
        if '.' not in page.split('/')[-1]:
            return f'{prefix}{dotdot}{course}/{page}.html{anchor}{quote}'
        return m.group(0)

    new_content = pattern.sub(add_html_ext, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

def fix_all_html_files(directory):
    for root, dirs, files in os.walk(directory):
        for fname in files:
            if fname.endswith('.html'):
                fix_extensionless_links(os.path.join(root, fname))

## PAGES WITH CONTENT

special_rewrites = {
    "href=\"${e['item']['link']}\"": "href=\"..${e['item']['link']}\"",
    "url(/fonts/source-sans-pro/SourceSansPro-Regular.otf": "url(../fonts/source-sans-pro/SourceSansPro-Regular.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Semibold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Semibold.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Bold.otf": "url(../fonts/source-sans-pro/SourceSansPro-Bold.otf",
    "url(/fonts/Montserrat-Bold.ttf": "url(../fonts/Montserrat-Bold.ttf",
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
    "$(location).prop(\'href\', \"../index.html\"+$(this).attr(\"class-value\"));": "$(location).prop(\'href\', \"../\"+$(this).attr(\"class-value\")+\".html\");"
}

for cs in css:
    special_rewrites[f"href=\"/_astro/{cs}\""] = f"href=\"../_astro/{cs}\""

content_pages.change_links(home, scripts, links, courses, special_rewrites)

## COURSE HOME PAGES

special_rewrites = {
    "href=\"${e['item']['link']}\"": "href=\".${e['item']['link']}\"",
    "url(/fonts/source-sans-pro/SourceSansPro-Regular.otf": "url(./fonts/source-sans-pro/SourceSansPro-Regular.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Semibold.otf": "url(./fonts/source-sans-pro/SourceSansPro-Semibold.otf",
    "url(/fonts/source-sans-pro/SourceSansPro-Bold.otf": "url(./fonts/source-sans-pro/SourceSansPro-Bold.otf",
    "url(/fonts/Montserrat-Bold.ttf": "url(./fonts/Montserrat-Bold.ttf",
    "?origin=sidebar": f'.html',
    "<script src=\"/static/js/themes.js\">": "<script src=\"./static/js/themes.js\">",
    'path_components = path.split("./index.html")': 'path_components = path.split("/")',
    "$(location).prop(\'href\', \"./index.html\"+$(this).attr(\"class-value\"));": "$(location).prop(\'href\', \"./\"+$(this).attr(\"class-value\")+\".html\");"
}

for cs in css:
    special_rewrites[f"href=\"/_astro/{cs}\""] = f"href=\"./_astro/{cs}\""

main_pages.change_links(home, scripts, links, courses, special_rewrites)
fix_all_html_files(home)
