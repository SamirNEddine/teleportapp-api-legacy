const cors = require('cors');

const whitelist = [process.env.CORS_WEBAPP_ORIGIN];
const noOriginEnabled = process.env.CORS_NO_ORIGIN;
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || (noOriginEnabled === '1' && !origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

module.exports.getServerCors = function () {
    return cors(corsOptions);
};