const express = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes');
const errorHandler = require('./middlewares/error_handler');
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'up', message: 'Server Up' });
});

app.use('/', routes);

app.use(errorHandler.getError);

app.listen(PORT, () => console.log('Server up'));