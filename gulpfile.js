var gulp = require('gulp');
var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var react = require('gulp-react');

gulp.task('typescript', function () {
	var tsResult = gulp.src('src/**/*.ts')
		.pipe(ts({
			declarationFiles: true,
			noExternalResolve: true
		}));

	return eventStream.merge(
		tsResult.dts.pipe(gulp.dest('build/definitions')),
		tsResult.js.pipe(gulp.dest('build/js'))
	);
});

gulp.task('react', function () {
	return gulp.src('src/**/*.jsx')
		.pipe(react())
		.pipe(gulp.dest('build/js'));
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.ts', ['typescript']);
	gulp.watch('src/**/*.jsx', ['react']);

});

gulp.task('default', ['typescript', 'react']);
