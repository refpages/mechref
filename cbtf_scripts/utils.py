import shutil
import os
from pathlib import PurePath

def explore_dir_and_move(home, dir, banned_dirs):
    #print(os.path.join(home, dir))
    dirs = [d for d in os.listdir(os.path.join(home, dir)) if (os.path.isdir(os.path.join(os.path.join(home, dir), d)) and d not in banned_dirs)]
    htmls = [d for d in os.listdir(os.path.join(home, dir)) if (d == 'index.html')]
    js = [d for d in os.listdir(os.path.join(home, dir)) if (d[-3:] == '.js')]
    #print(dirs, htmls, js)
    if dir != '':
        for h in htmls:
            try:
                
                ppth = PurePath(os.path.join(os.path.join(home, dir), h))
                file_name = ppth.parts[-2]+'.html'
                #print(os.path.join("/".join(ppth.parts[:-2]), file_name))
                shutil.move(os.path.join(os.path.join(home, dir), h), os.path.join("/".join(ppth.parts[:-2]), file_name))
            except Exception as e:
                print(e)
                pass

        for j in js:
            try:
                
                ppth = PurePath(os.path.join(os.path.join(home, dir), j))
                file_name = ppth.parts[-2]+'.js'
                
                if j == 'canvases.js':
                    #print(os.path.join("/".join(ppth.parts[:-2]), file_name))
                    shutil.move(os.path.join(os.path.join(home, dir), j), os.path.join("/".join(ppth.parts[:-2]), file_name))
                else:
                    #print(os.path.join("/".join(ppth.parts[:-2]), j))
                    shutil.move(os.path.join(os.path.join(home, dir), j), os.path.join("/".join(ppth.parts[:-2]), j))
            except Exception as e:
                print(e)
                pass
        
    for d in dirs:
        explore_dir_and_move(home, os.path.join(dir, d), banned_dirs)
    return dirs