const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

const students = require('./backend/routes/api/students');
const users = require('./backend/routes/api/authentication');

const passport = require('passport');
const path = require('path')

const app = express();


app.use(passport.initialize());
app.use(passport.session());
require('./backend/passport')(passport);
// body parser middleware
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.get('/', (req, res) => {
    res.send('Welcome to Our SCHOOL API');
});

app.use('/api/students', students);
app.use('/api/users', users);
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('levineclient/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'levineclient', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server started on port ${port}.`)
});