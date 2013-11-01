git status

# Checkout master branch
git checkout master

# Rename the /web directory to .web
mv web .web
mv node_modules .node_modules
 
# Remove all non . files
rm -rf *

# Copy everything from .web to current dir
rsync -a .web/ ./
 
# Remove .web 
rm -rf .web

# Add everything
git add .

# Commit using the same commit message as from the 'source' branch
git commit -C source
git push origin master

# Remove everything again
rm -rf *

# Re-add node_modules
mv .node_modules node_modules

# checkout source again
git checkout source
