var gulp =require("gulp");
var cleanCss=require("gulp-clean-css");
var htmlmin=require("gulp-htmlmin");
var uglify=require("gulp-uglify");
var babel=require("gulp-babel");
var connect=require("gulp-connect");
var sass=require("gulp-sass")

gulp.task("css",function(){
	gulp.src("src/css/**/*.scss")
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})

gulp.task("html",function(){
	gulp.src("src/**/*.html")
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true
		}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
})

gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
	.pipe(babel({
		    presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})

gulp.task("server",function(){
	connect.server({
		port:1809,
		livereload: true,
		root: "dist"
	})
})

gulp.task("img",function(){
	gulp.src("src/static/img/**/*")
		.pipe(gulp.dest("dist/img"));
})

gulp.task("libs",function(){
	gulp.src("src/libs/**/*")
		.pipe(gulp.dest("dist/libs"));
})

gulp.task("watch",function(){
	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch("src/css/**/*.scss", ["css"]);
	gulp.watch("src/js/**/*.js", ["js"]);
})

gulp.task("default", ["html", "css", "js", "server", "watch", "img", "libs"]);