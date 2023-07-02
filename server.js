const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');
const { routes } = require("./Routes/routes");
const errorHandler = require('./utils/errorHandler');
const fs = require('fs');
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

connectDB();

const app1 = express();
app1.use(cors());
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: false }));
app1.use(morgan('combined', { stream: accessLogStream }));

const app2 = express();
app2.use(cors());
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));
app2.use(morgan('combined', { stream: accessLogStream }));

const app3 = express();
app3.use(cors());
app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({ extended: false }));
app3.use(morgan('combined', { stream: accessLogStream }));

routes(app1);
routes(app2);
routes(app3);
app1.use(errorHandler);
app2.use(errorHandler);
app3.use(errorHandler);


const PORT1 = process.env.PORT1 || 3001;
const PORT2 = process.env.PORT2 || 3002;
const PORT3 = process.env.PORT3 || 3003;

app1.listen(PORT1, () => {
    console.log(`App 1 is running on http://localhost:${PORT1}`);
});

app2.listen(PORT2, () => {
    console.log(`App 2 is running on http://localhost:${PORT2}`);
});

app3.listen(PORT3, () => {
    console.log(`App 3 is running on http://localhost:${PORT3}`);
});