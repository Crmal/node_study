const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
//Api
const indexApi = require('./api');
const authApi = require('./api/auth');
const postsApi = require('./api/api');
//apps
app.use(express.json());
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use('/', indexApi);
app.use('/auth', authApi);
app.use('/api', postsApi);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});