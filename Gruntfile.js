module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            /*css: {
               src: [
                     'css/*'
                    ],
                dest: 'min/combined.css'
            },*/
            js : {
                src : [
                    'js/jquery*'
                ],
                dest : 'min/jquery.js'
            }
        },
        cssmin : {
            css:{
                expand: true,
                cwd: 'css',
                src: '*.css',
                dest: 'min/',
                ext: '.css'
            }
        },
        uglify : {
            jquery: {
                files: {
                    'min/jquery.js' : [ 'min/jquery.js' ]
                }
            },
            js: {
                expand: true,
                cwd: 'js',
                src: ['*.js', '!jquery*'],
                dest: 'min/',
                ext: '.js'
            }
        },
        watch: {
          files: ['css/*', 'js/*'],
          tasks: ['cssmin', 'concat', 'uglify']
       }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['cssmin:css', 'concat', 'uglify' ]);  
};