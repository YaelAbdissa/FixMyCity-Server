const path = require('path');


module.exports = {
    env: "development",
    port: 1000,
    mongo: {
      uri: "mongodb://mongo:27017/FixMyCity",
    },
    logs: 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"
    
  };