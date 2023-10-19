const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoute = require('./routes/product')
const categoryRoute = require('./routes/category')
const app = express();
const port = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use('/product',productRoute)
app.use('/category',categoryRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
