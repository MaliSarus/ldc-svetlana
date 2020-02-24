var gulp       	 = require('gulp');
var sass       	 = require('gulp-sass');
var browserSync 	 = require('browser-sync').create();
var autoprefixer 	 = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: './src'
        },
    });
    done()
});

gulp.task('sass', function(done){
    gulp.src('./src/assets/scss/*.scss')
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./src/assets/maps'))
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(browserSync.stream());
    done()
});

gulp.task('default', gulp.series('sass', 'browser-sync', function(done) {
    gulp.watch('./src/**/*.scss', gulp.series('sass'));
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("src/assets/js/*.js").on('change', browserSync.reload);
    done()
}));