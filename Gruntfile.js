module.exports = function(grunt) {

  /* Based on https://gist.github.com/dixonj16/7418730 */

  grunt.initConfig({
    app: {
      name: 'playSound Demo'
    },
    clean: {
      plugins: ['plugins'],
      platforms: ['platforms']
    },
    mkdir: {
      'default': {
        options: {
          create: ['plugins', 'platforms']
        }
      }
    },
    copy: {
      platform_merges: {
        expand: true,
        dest: './platforms/',
        cwd: 'platform-merges',
        src: '**'
      },
      resources_android: {
        files: [
          {src: ['www/res/icons/android/icon-36-ldpi.png'], dest: 'platforms/android/res/drawable-ldpi/icon.png'},
          {src: ['www/res/icons/android/icon-48-mdpi.png'], dest: 'platforms/android/res/drawable-mdpi/icon.png'},
          {src: ['www/res/icons/android/icon-72-hdpi.png'], dest: 'platforms/android/res/drawable-hdpi/icon.png'},
          {src: ['www/res/icons/android/icon-96-xhdpi.png'], dest: 'platforms/android/res/drawable-xhdpi/icon.png'},
          {src: ['www/res/icons/android/icon-96-xhdpi.png'], dest: 'platforms/android/res/drawable/icon.png'}
        ]
      }
    },
    cordovacli: {
      options: {
        path: './'
      },
      add_platforms: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['android']
        }
      },
      add_plugins: {
        options: {
          command: 'plugin',
          action: 'add',
          plugins: [
            'splashscreen',
            'media'
          ]
        }
      },
      build_android: {
        options: {
          command: 'build',
          platforms: ['android']
        }
      },
      prepare_android: {
        options: {
          command: 'prepare',
          platforms: ['android']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'archive.zip'
        },
        files: [
          {src: ['www/**'], dest: ''},
          {src: ['plugins/**'], dest: ''},
          {src: ['platforms/**'], dest: ''},
          {src: ['merges/**'], dest: ''}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-cordovacli');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('init', 'Initialize the development environment.',[
    'clean',
    'mkdir',
    'cordovacli:add_platforms',
    'cordovacli:add_plugins',
    'update'
  ]);

  grunt.registerTask('update', 'Update platforms.', [
    'cordovacli:prepare_android',
    'copy',
    'compress:main'
  ]);

  grunt.registerTask('build', 'Build Platforms.', [
    'cordovacli:build_android'
  ]);

};