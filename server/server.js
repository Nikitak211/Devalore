const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('dotenv').config()

app.use(cors())

const Api = require('./routes/api')

const mongoDBUri = process.env.MONGODB_URI

app.use(bodyParser.json())

mongoose.connect(mongoDBUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once('open', function () {
    console.log('connection is success!! ');
}).on('error', function (error) {
    console.log('***connection not available***', error);
});

app.use('/api',Api)

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})