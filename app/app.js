const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./models/index');
db.sequelize.sync();


const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

require('./config/passport')(app);

app.use('/', require('./routes/index'));
// app.get('/delete/:id', (req, res) => {
//   console.log(req.params.id)
// })

// app.post('/delete/:id', (req, res) => {
//   console.log(req.params.id)
//   res.redirect('/')
// })

app.listen(port);
