module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'js_build/site.min.js': [
            'sub/bolt/js/jquery.js',
            'sub/bolt/js/jquery.support.inputtypes.js',
            'sub/bolt/js/jquery.event.tap.js',
            'sub/bolt/js/jquery.event.activate.js',
            'sub/bolt/js/jquery.transition.js',
            
            'sub/bolt/js/bolt.js',
            'sub/bolt/js/bolt.a.js',
            'sub/bolt/js/bolt.tip.js',
            'sub/bolt/js/bolt.input.js',
            'sub/bolt/js/bolt.input.placeholder.js',
            
            'js/AcousticFunctions.js',
            'sub/app/js/model.js',
            'sub/app/js/app.js',
            'js/noiseapp.js',
            'js/noiseapp.models.source.js',
            'js/noiseapp.models.total.js',
            'js/noiseapp.views.source.js',
            'js/noiseapp.views.total.js',
            'js/noiseapp.views.form.js'
          ],
        }
      }
    },
    
    cssmin: {
      compress: {
        files: {
          'css_build/site.min.css': [
            'sub/app/css/app.css',
            'sub/bolt/css/bolt.normalise.css',
            'sub/bolt/css/bolt.typography.css',
            'sub/bolt/css/bolt.typography.15_21.css',
            'sub/bolt/css/bolt.forms.css',
            'sub/bolt/css/bolt.classes.css',
            'sub/bolt/css/bolt.classes.col.css',
            'sub/jquery.skin/css/skin.css',
            'css/site.classes.css',
            'css/site.classes.block.css'
          ]
        }
      },
      with_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'css_build/site.min.css': ['css_build/*.css']
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
};