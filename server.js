const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
require('dotenv').config();
const connectDB  = require('./config/db');
const { routes } = require("./Routes/routes");
const errorHandler = require('./utils/errorHandler');
const fs = require('fs');
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }));

routes(app);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
});
