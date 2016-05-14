module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      scripts: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'build/'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test',
          src: '**/*.js',
          dest: 'test-build'
        }]
      }
    },
    clean: {
      files: ['build/**/*.js', 'test-build/**/*.js']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'server/**/*.js', 'test/**/*.js'],
        tasks: ['clean', 'babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'babel']);
};
