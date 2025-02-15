# Syncing the reference pages with PrairieLearn

Index:
<ul>
    Refer to the guide for your specific Operating System:
    <ul>
        <li><a href="#windows">Windows</a></li>
        <li><a href="#linux">Linux</a></li>
        <li><a href="#linux">MacOS</a></li>
    </ul>
</ul>

## <a id="windows">Windows</a>

Inside the Mechref folder, run the following command to compile the reference pages into `.html` files
```
npm run astro build
```

Once the command has completed, run this next command to make sure links function properly
```
python3 cbtf.py
```

After completion, the built version of the reference pages will be in the `dist` folder. Navigate to your course git repository. 

Example: if your course is TAM 210/211, navigate to
```
C:\Users\<user>\Documents\GitHub\pl-tam210\clientFilesCourse\mechref
```
and run the following command to make sure your course repository is up-to-date
```
git pull
```
Then, copy the content of the `dist` folder into here. Select `Replace the file in the destination` for all files to overwrite the old files with their newer versions.

Run the following three commands
```
git add -A
git commit -m "Updated reference pages"
git push
```

And the newer version of the reference pages should now be uploaded to the course git repository. Then, in your course, navigate to the `Sync` tab, and click `Pull from remote git repository`.

## <a id="linux">Linux & MacOS</a>

Run the following command inside the Mechref folder, where &lt;MR_LOC&gt; is the location of the Mechref repository on your computer. By default, it should be `$HOME/Documents/GitHub`.

```
sh cbtf.sh <MR_LOC>
```

The command will execute and should copy the new version of the reference pages into each course's GitHub repository and upload the changes. Then, in your course, navigate to the `Sync` tab, and click `Pull from remote git repository`.
