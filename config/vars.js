const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
    env: "development",
    port: 2000,
    mongo: {
      uri: "mongodb://mongo:27017/FixMyCityT",
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"
    
  };