git status

# Checkout the master branch
git checkout master

# Rename the /web directory to .web
mv web .web

# Remove all non . files
rm -rF

# Copy everything from .web to current dir

# Remove .web 

# Add everything
git add .

# Commit
git commit -m "updated compiled site"

# Push to origin
git push origin master

#Checkout the source branch:
git checkout source