#!/bin/bash 
# BUILD PAGES AND MODIFY LINKS
npm run astro build
python3 cbtf.py

# MOVE PAGES TO RESPECTIVE REPOS AND COMMIT

declare -a courses=("210" "212" "251")

for c in "${courses[@]}"
do
    echo "TAM $c"
    cd "$HOME/Documents/GitHub/pl-tam$c"
    git switch master
    git stash
    git pull --rebase
    scp -r "$HOME/mechref/dist" "$HOME/Documents/GitHub/pl-tam$c/clientFilesCourse/"
    rm -rf "clientFilesCourse/mechref"
    mv "clientFilesCourse/dist" "clientFilesCourse/mechref" 
    git add -A
    git commit -m "Updated reference pages"
    git push
done

cd "$HOME/mechref"
