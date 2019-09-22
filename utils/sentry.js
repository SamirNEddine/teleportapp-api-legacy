const Sentry = require('@sentry/node');

module.exports.setupSentry = function () {
    if (process.env.SENTRY_DSN){
        Sentry.init({ dsn: process.env.SENTRY_DSN });
    }
};