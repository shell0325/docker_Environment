var express = require('express'),
  app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Test Express!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
