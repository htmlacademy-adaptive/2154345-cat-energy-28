import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import {stacksvg} from 'gulp-stacksvg';
import {deleteAsync} from 'del';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin( { collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}


// Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}


// Images

const optimizeImages = () => {
  return gulp.src([
    'source/img/content/*.{jpg,png}',
    'source/img/decor/*.{jpg,png}'
  ], {
    base: 'source'
  })
    .pipe(squoosh())
    .pipe(gulp.dest('build'))
}

const copyImages = () => {
  return gulp.src([
    'source/img/content/*.{jpg,png}',
    'source/img/decor/*.{jpg,png}'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
}


// Webp

const createWebp = () => {
  return gulp.src([
    'source/img/content/*.{jpg,png}',
    'source/img/decor/*.{jpg,png}'
  ], {
    base: 'source'
  })
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build'))
}


// Svg

const createStack = () => {
  return gulp.src('source/img/stack/*.svg')
    .pipe(svgo())
    .pipe(stacksvg({ output: 'sprite' }))
    .pipe(gulp.dest('build/img'))
}

const svgOptimize = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('build/img/svg'))
}

const svgCopy = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(gulp.dest('build/img/svg'))
}


// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/favicons/*.*',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
    done();
}


// Clean

const clean = () => {
  return deleteAsync('build');
}


// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}


// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles, reload));
  gulp.watch('source/js/script.js', gulp.series(scripts, reload))
  gulp.watch('source/*.html', gulp.series(html, reload));
}


// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  svgOptimize,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    createStack
  )
)


export default gulp.series(
  clean,
  copy,
  optimizeImages,
  svgOptimize,
  gulp.parallel(
    styles,
    html,
    scripts,
    createWebp,
    createStack
  ),
  gulp.series(
    server,
    watcher
  )
);
