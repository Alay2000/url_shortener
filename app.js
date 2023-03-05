const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const config = require('./config/config');
const db = require('./middleware/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use('/', require('./routes/shortener'));
http.createServer(app)
db.raw('select 1').then(() => {
    console.log('DB connected');
    app.listen({ port: config.port }, () =>
        console.log(
            `🚀 Server ready at: http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}`
        )
    )
});