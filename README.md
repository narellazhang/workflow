# workflow
For daily front-end development.Use gulp to automate the processes.gulp default task including refresh the browser, compile sass. gulp build task including compressed css, js, image.
##start
```
git clone git@github.com:narellazhang/workflow.git
```
##develop
```
npm install
```
```
gulp
```
Then,the index.html will open in the browser.Files's changes in `src` will refresh the browser,and you can enjoy your develop.

when you done the develop
```
gulp build
```
to bulid and minify all stuff. A `dist` folder will be created and ready for distribution.
