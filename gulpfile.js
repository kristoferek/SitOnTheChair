var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
//Te dwie paczki sprawią, że gulp watch i gulp-serve nie będzie się wywalał przy każdym błędzie
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

gulp.task('sass', function(){
  return gulp.src('sass/main.scss')
  .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
  .pipe(sourcemaps.init({
           loadMaps: true
       }))// zapewnia wyswietlanie w przegladarce w Inspektorze styli z odniesieniem do plikow scss!!!
  .pipe(sass({
    outputStyle: 'compact', // stopien uproszczenia scss do css
    //sourceComments: 'map', // komentowanie wewnetrzne zrodla scss w css
    errorLogToConsole: true
  }))
  .pipe(sourcemaps.write()) // zapewnia wyswietlanie w przegladarce w Inspektorze styli z odniesieniem do plikow scss!!!
  .pipe(autoprefixer({
            browsers: ['> 1%'], //największy zakres ['> 1%'] - więcej niż 99% procent przeglądarek
            cascade: false
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream());

});

gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ["sass"]); // sass to nazwa taska z poprzedniej definicji gulp.task('sass', function(){})
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
