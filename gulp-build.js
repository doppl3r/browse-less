var gulp = require('gulp');
gulp.src(
    [
        'manifest.json',
        'www/popup.html',
        'www/css/**/*',
        'www/fonts/**/*',
        'www/img/icons/icon16.png',
        'www/img/icons/icon48.png',
        'www/img/icons/icon128.png',
        'www/img/icons/google-icon.svg',
        'www/js/**/*'
    ], { base: './' }
).pipe(
    gulp.dest(
        'build'
    )
);