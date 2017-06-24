// Підключення модулів
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');



// task для sass + autoprefixer
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))	
});


// таск для автоматичного оновлення файлів проекту після збережених змін(server)
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

// таск для збірки та зжимання всіх скриптів
gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/bootstrap/dist/js/bootstrap.min.js',
			'app/libs/mmenu/dist/jquery.mmenu.all.js',
			'app/libs/jQuery-viewport-checker/dist/jquery.viewportchecker.min.js',
			'app/libs/owl.carousel/dist/owl.carousel.min.js',
			'app/libs/page-scroll-to-id/jquery.malihu.PageScroll2id.js',
			'app/libs/count/jquery.spincrement.js',
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

//таск для зжиманння всіх бібліотек css
gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
});

// таск для продакшн - кінцева папка проекту
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css',
		])
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));	

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));		
});

// таск для чистки папки dist перед 'build'
gulp.task('clean', function() {
	return del.sync('dist');
});
// такс для очиcтки кеш
gulp.task('clear', function() {
	return cache.clearAll();
});

// таск для оптимізації image
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));	
});

//таск для перевірки змін в збережених файлах
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

//таск за замовчуванням
gulp.task('default', ['watch']);