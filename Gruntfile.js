module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON('secret.json'),
        "webstore_upload": {
            "accounts": {
                "default": { //account under this section will be used by default
                    publish: true, //publish item right after uploading. default false
                    client_id: "<%= secret.client_id %>", // "000000000000-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@developer.gserviceaccount.com"
                    client_secret: "<%= secret.client_secret %>", // "xxxxxxxxxxxxx-xxxxxxxxxx"
                }
            },
            "extensions": {
                "lens": {
                    //required
                    appID: "ibdlkknhoibmpmoglnmkapalkminbidc",
                    //required, we can use dir name and upload most recent zip file
                    zip: "coursera-searcher.zip"
                }
            }
        },
        concat: {
          dist: {
            files: {
                'coursera-searcher/coursera-fts.lib.js': ['./bower_components/lodash/lodash.min.js',
                    './bower_components/lunr.js/lunr.min.js',
                    './bower_components/jquery/dist/jquery.min.js',
                    './bower_components/pouchdb/dist/pouchdb.js',
                    './bower_components/q/q.js',
                    './bower_components/handlebars/handlebars.runtime.min.js'],
                'coursera-searcher/coursera-fts.js':["coursera-searcher/templates.js",
                    "coursera-searcher/picomodal.js",
                    'coursera-searcher/coursera-searcher.js']
            },
          }
        },
        // uglify: {
        //   options: {
        //     ascii_only: true,
        //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //   },
        //   dist: {
        //     files: {
        //       'coursera-searcher/dist.coursera-fts.min.js': ['<%= concat.dist.dest %>']
        //     }
        //   }
        // },
        handlebars: {
            options: {namespace:"HANDLEBAR_TEMPLATES"},
          compile: {
            files: {
              "coursera-searcher/templates.js": "coursera-searcher/result.hbs",
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-webstore-upload');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.registerTask('make', ['handlebars','concat']);

    grunt.registerTask('publish', ['make','webstore_upload']);
};