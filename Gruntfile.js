module.exports = function(grunt) {
  grunt.initConfig({
    babel: {
      scripts: {
        files: [{
          expand: true,
          cwd: 'lib',
          src: '**/*.js',
          dest: 'build/'
        }]
      }
    },
    eslint: {
      scripts: ['lib/**/*.js']
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js'],
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['babel', 'eslint']);
};
