git status

# Delete the master branch
git branch -D master

# Create a new master branch
git checkout -b master

#Force the web subdirectory to be project root:
git filter-branch --subdirectory-filter web/ -f

#Checkout the source branch:
git checkout source

#Push all
git push --all origin