const gulp = require('gulp');
const merge2 = require('merge2');
const gulpCopy = require('gulp-copy');
const ts = require('gulp-typescript');
const through2 = require('through2');

const outputPath = 'libs/';
const tsFiles = ['./source/**/*.ts', './source/**/*.tsx'];
const otherFiles = [
  './source/**/*.*',
  '!./source/**/*.md',
  '!./source/**/*.tsx',
  '!./source/**/*.ts',
  '!./source/**/*.jsx'
];

const path = require('path');
const assign = require('object-assign');

const getTSConfig = () => {
  const my = require(path.join(process.cwd(), 'tsconfig.json'));

  return assign(
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true
    },
    my.compilerOptions
  );
};

const compileTs = stream =>
  stream
    .pipe(ts(getTSConfig()))
    .js.pipe(
      through2.obj(function(file, encoding, next) {
        file.path = file.path.replace(/\.[jt]sx$/, '.js');
        this.push(file);
        next();
      })
    )
    .pipe(gulp.dest(outputPath));

const compileDTs = stream =>
  stream
    .pipe(ts(getTSConfig()))
    .dts.pipe(
      through2.obj(function(file, encoding, next) {
        file.path = file.path.replace(/\.[jt]sx$/, '.d.ts');
        this.push(file);
        next();
      })
    )
    .pipe(gulp.dest(outputPath));

const compileOther = stream => stream.pipe(gulpCopy(outputPath, { prefix: 1 }));

gulp.task('default', () => {
  const tst = compileTs(
    gulp.src(tsFiles, {
      base: path.join(process.cwd(), 'source')
    })
  );
  const dts = compileDTs(
    gulp.src(tsFiles, {
      base: path.join(process.cwd(), 'source')
    })
  );
  const other = compileOther(gulp.src(otherFiles));
  return merge2([tst, dts, other]);
});
