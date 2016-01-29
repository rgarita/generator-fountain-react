const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'react';
      this.fountainPrompting();
    },

    sample() {
      const done = this.async();

      this.option('sample', {type: Boolean, required: false});

      const prompts = [{
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'}
        ]
      }];

      this.prompt(prompts, props => {
        Object.assign(this.props, this.options, props);
        done();
      });
    }
  },

  configuring: {
    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          'react': '^0.14.3',
          'react-dom': '^0.14.3'
        },
        devDependencies: {
          'babel-preset-react': '^6.1.18',
          'eslint': '^1.10.3',
          'eslint-config-xo-react': '^0.3.0',
          'eslint-config-xo-space': '^0.8.0',
          'eslint-plugin-react': '^3.10.0'
        },
        eslintConfig: {
          extends: [
            'xo-react'
          ],
          env: {
            browser: true
          }
        }
      });

      if (this.props.js === 'babel') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-eslint': '^5.0.0-beta6',
            'eslint-plugin-babel': '^3.0.0'
          },
          eslintConfig: {
            extends: [
              'xo-space/esnext'
            ]
          }
        });
      }

      if (this.props.js === 'js') {
        this.mergeJson('package.json', {
          eslintConfig: {
            extends: [
              'xo-space'
            ]
          }
        });
      }

      if (this.props.js === 'typescript') {
        this.mergeJson('package.json', {
          devDependencies: {
            'react-addons-test-utils': '^0.14.5'
          }
        });
      }
    },

    babel() {
      this.mergeJson('.babelrc', {
        presets: ['react']
      });
    }
  },

  composing() {
    this.composeWith(`fountain-react:${this.props.sample}`, {options: this.props}, {
      local: require.resolve(`../${this.props.sample}`)
    });
    this.composeWith('fountain-gulp', {options: this.props}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
