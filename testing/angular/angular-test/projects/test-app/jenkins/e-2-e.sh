export IS_JENKINS=true

node --version
npm --version
google-chrome --version

cd $WORKSPACE
npm install
npm run webdriver-update
