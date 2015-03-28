// Importamos módulos a usar
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	historyApiFallback = require('connect-history-api-fallback'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish');

// Servidor web de desarrollo
gulp.task('server', function () {
	connect.server({
		root: './app',
		hostname: '0.0.0.0',
		port: '8080',
		livereload: true,
		middleware: function (connect, opt) {
			return [ historyApiFallback ];
		}
	});
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function () {
	return gulp.src('./app/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

// Pre-procesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function () {
	gulp.src('./app/stylesheets/main.styl')
		.pipe(stylus({ use: nib }))
		.pipe(gulp.dest('./app/stylesheets'))
		.pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function () {
	gulp.src('./app/**/*.html')
		.pipe(connect.reload());
});

// Vigila los cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function () {
	gulp.watch(['./app/**/*.html'], ['html']);
	gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
	gulp.watch(['./app/scripts/**/*.js'], ['jshint']);
});

// Lanza las tareas server y watch para vigilar los cambios producidos
gulp.task('default', ['server', 'watch']);