const path = require('path');

//mongodb://mongo:27017/FixMyCity
//mongodb://localhost:27017/FixMyCity
module.exports = {
    env: "development",
    port: process.env.PORT,
    mongo: {
      uri: process.env.MONGO_URI,
    },
    logs: 'production' ? 'combined' : 'dev',
    jwt_key: 'sampleRandomKey',
    session_key : "randomsession"
    
  };