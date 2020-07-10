const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose
  .connect('mongodb+srv://dbUser:dbUser1234@react-basic.q69yi.mongodb.net/dbUser?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hi'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
