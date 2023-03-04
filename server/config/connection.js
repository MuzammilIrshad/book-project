
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = (URI) => {
  try {
    const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.log(`Connection error ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

  } catch (error) {
    setTimeout(dbConnection,3001)
  }
};

module.exports = dbConnection;

