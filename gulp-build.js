var gulp = require('gulp');
gulp.src(
    [
        'manifest.json',
        'www/index.html',
        'www/assets.json',
        'www/css/**/*',
        'www/fonts/**/*',
        'www/img/ad.png',
        'www/img/icons/icon.png',
        'www/img/icons/icon16.png',
        'www/img/icons/icon48.png',
        'www/img/icons/icon128.png',
        'www/img/icons/google-icon.svg',
        'www/js/**/*',
        'www/levels/**/*',
        'www/sounds/**/*',
        '!www/sounds/music*/'
    ], {base: './'}
).pipe(
    gulp.dest(
        'build'
    )
);