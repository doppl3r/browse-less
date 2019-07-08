# Browse Less

The more you browse, the less you see. Break bad habits that cause you to scroll forever.

#### Tools:
  - [NodeJS](https://nodejs.org/) (Development)
      - gulp
      - gulp-zip

#### Building Google Extension Release
  - Update release version in manifest.json
  - Install 'gulp': ```npm install --save-dev gulp```
  - Install 'gulp-zip': ```npm install --save-dev gulp-zip```
  - Run gulp-build: ```node gulp-build.js```
  - Run gulp-dist: ```node gulp-dist.js```
  - Upload browse-less.zip located under ```/dist```