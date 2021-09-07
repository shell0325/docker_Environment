const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const db = require('./models/index');
db.sequelize.sync();


const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(methodOverride('_method'));


require('./config/passport')(app);

app.use('/', require('./routes/index'));

app.listen(port);
