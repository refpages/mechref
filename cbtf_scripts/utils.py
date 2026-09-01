import shutil
import os
import re
from pathlib import PurePath

def fix_canvases_js_paths(home, courses):
    for course in courses:
        course_dir = os.path.join(home, course)
        if not os.path.exists(course_dir):
            continue
        for item in os.listdir(course_dir):
            js_path = os.path.join(course_dir, item, 'canvases.js')
            if os.path.exists(js_path):
                with open(js_path, 'r', encoding='utf8') as f:
                    data = f.read()
                # rewrite /course/page/image.ext -> page/image.ext
                data = re.sub(r'"/' + course + r'/([^/]+)/([^"]+\.(jpg|jpeg|png|gif|svg|webp|mp4|csv|json))"', r'"\1/\2"', data)
                # rewrite bare image filenames -> page/image.ext
                data = re.sub(r'"([^"/]+\.(jpg|jpeg|png|gif|svg|webp|mp4|csv|json))"', rf'"{item}/\1"', data)
                with open(js_path, 'w', encoding='utf8') as f:
                    f.write(data)

# Files that must stay in their page subfolders because they have hardcoded paths to assets in the same folder
STAY_IN_SUBFOLDER = {'canvases.js', 'py_triples.js', 'worldCoastlineCompressed.js'}

def explore_dir_and_move(home, dir, banned_dirs):
    dirs = [d for d in os.listdir(os.path.join(home, dir)) if (os.path.isdir(os.path.join(os.path.join(home, dir), d)) and d not in banned_dirs)]
    htmls = [d for d in os.listdir(os.path.join(home, dir)) if (d == 'index.html')]
    js = [d for d in os.listdir(os.path.join(home, dir)) if (d[-3:] == '.js')]

    if dir != '':
        for h in htmls:
            try:
                ppth = PurePath(os.path.join(os.path.join(home, dir), h))
                file_name = ppth.parts[-2]+'.html'
                shutil.move(os.path.join(os.path.join(home, dir), h), os.path.join("/".join(ppth.parts[:-2]), file_name))
            except Exception as e:
                print(e)

        for j in js:
            if j in STAY_IN_SUBFOLDER:
                continue  
            try:
                ppth = PurePath(os.path.join(os.path.join(home, dir), j))
                shutil.move(os.path.join(os.path.join(home, dir), j), os.path.join("/".join(ppth.parts[:-2]), j))
            except Exception as e:
                print(e)
                pass

    for d in dirs:
        explore_dir_and_move(home, os.path.join(dir, d), banned_dirs)
    return dirs

def strip_link_text(home, texts):
    pattern = re.compile(
        r'<a\b[^>]*>\s*(?:<span\b[^>]*>)?\s*('
        + '|'.join(re.escape(t) for t in texts)
        + r')\s*(?:</span>)?\s*</a>',
        re.IGNORECASE
    )
    for root, dirs, files in os.walk(home):
        for fname in files:
            if not fname.endswith('.html'):
                continue
            path = os.path.join(root, fname)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            new_content = pattern.sub(r'\1', content)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)