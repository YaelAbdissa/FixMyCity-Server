const path = require('path');

//mongodb://mongo:27017/FixMyCity
//mongodb://localhost:27017/FixMyCity
module.exports = {
    env: "development",
    port: env.process.PORT,
    mongo: {
      uri: env.process.MONGO_URI_TESTS,
    },
    logs: 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"
    
  };