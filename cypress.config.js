
module.exports = {
  e2e: {
    baseUrl: 'https://practice.expandtesting.com',
    setupNodeEvents(on, config) {
      // Intercept ad requests globally
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

