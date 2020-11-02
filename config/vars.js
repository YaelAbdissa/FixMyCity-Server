const path = require('path');

//mongodb://mongo:27017/FixMyCity
//mongodb://localhost:27017/FixMyCity
module.exports = {
    env: "development",
    port: 1000,
    mongo: {
      uri: "mongodb://mongo:27017/FixMyCityT",
    },
    logs: 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"
    
  };