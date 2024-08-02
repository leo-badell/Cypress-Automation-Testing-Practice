const { defineConfig } = require('cypress');

module.exports = {
  e2e: {
    env:{
      baseUrl: 'https://practice.expandtesting.com',
    },
    setupNodeEvents(on, config) {
      // Intercept ad requests globally
      module.exports = {
        e2e: {
          setupNodeEvents(on, config) {
            // This is required if your project uses a file extension other than .js for test files
            // (e.g., .ts, .jsx, etc.)
            on('file:preprocessor', require('@cypress/typescript-preprocessor'));
          },
        },
      };
      
      on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.args.push('--disable-features=PreloadMediaEngagementData,AutoplayIgnoreWebAudio,PreloadMediaEngagementData2');
        return launchOptions;
      });
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    supportFile: 'cypress/support/commands.js',
  }
};

