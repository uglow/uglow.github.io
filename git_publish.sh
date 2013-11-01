git status

# Checkout the master branch
git checkout master

#Force the web subdirectory to be project root:
git filter-branch --subdirectory-filter web/ -f

#Checkout the source branch:
git checkout source

#Push all
git push --all origin