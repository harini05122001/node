const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

mongoose.connect('mongodb://localhost:27017/node-express-crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', productRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
