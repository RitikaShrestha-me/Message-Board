const express = require('express');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');

const userDB = require("./models/user");
const noteDB = require("./models/note");


// Express App
const app = express();

const messages = [];

app.use(bodyParser.urlencoded({ extended: true }));

// Registering View Engine
app.set('view engine', 'ejs');

// Listen for requests
const port = 3000;
app.listen(port, async() => {
    console.log(`Listening on port 3000!`);
});

//Middleware & Static files
app.use(express.static('assets'));
app.use(express.static('styles'));



// Redirect
app.get('/', (req, res) => {
    res.render('register', { title: 'Register' });
});

//Load pages

// About Us
app.get('/aboutUs', (req, res) => {
    res.render('about', { title: 'About Us' });
});

//Login Page
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

//Register Page
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// onClicking Register Button
app.post('/registerUser', (req, res) => {
    console.log(req.body);
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = passwordHash.generate(password);
    const groupName = req.body.groupName;
    const newUser = {
        userName: userName,
        email: email,
        password: hashedPassword,
        groupName: groupName
    };

    // Inserting User to database
    userDB.insertUser(newUser).then(() => {
        res.status(200).render('login', { title: 'Login' });
    })

});

// Posts Page
app.get('/post', (req, res) => {

        // Fetching all notes 
        noteDB.fetchNote('company')
                .then((messages) => {
                    console.log(messages);
                    res.status(200).render('note', { title: 'Home' , messages });
            });
    res.render('note', { title: 'Home' , messages });
});

// onClicking Login Button
app.post('/validateUser', (req, res) => {
    console.log(req.body);

    const userName = req.body.userName;
    const password = req.body.password;

    if(userName && password){
        userDB.fetchUser(userName).then((response) => {
            if(response && response.password){

                // Verify Password Entered in Login Page
                if(passwordHash.verify(password, response.password)){
                    console.log("true");

                    // Fetching all notes 
                    noteDB.fetchNote('company')
                        .then((messages) => {
                            console.log(messages);
                            res.status(200).render('note', { title: 'Home' , messages });
                        });
                }
            } else {
                res.render('register', { title: 'Register' });
            }
        });
    }
});

// Adding Note
app.post('/addNote', (req, res) => {
    if(req.body.noteTitle && req.body.noteText){
        console.log(req.body);
        const groupName = 'company';
        const noteTitle = req.body.noteTitle;
        const noteText = req.body.noteText;
        const addNote = {
            groupName: groupName,
            noteTitle: noteTitle,
            noteText: noteText,
        };

        // Inserting Note
        noteDB.insertNote(addNote).then(() => {
            console.log("added");

            // Fetching all notes after inserting
            noteDB.fetchNote('company')
                .then((messages) => {
                    console.log(messages);
                    res.status(200).render('note', { title: 'Home' , messages });
                });    
        });
    } else {
        console.log("empty");

        // Fetching all notes 
        noteDB.fetchNote('company')
            .then((messages) => {
                console.log(messages);
                res.status(200).render('note', { title: 'Home' , messages });
        });
    }

});


// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 Error' });
});

 