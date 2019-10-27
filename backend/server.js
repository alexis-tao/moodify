
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//create express server at this port 
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
//allow us to parse json 
app.use(express.json());


//our database uri 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});