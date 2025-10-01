const express = require('express');
const app = express();
const port = 3000;

const crypto = require('crypto');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const users = [];
app.post('/users', (req, res) => { //creates user
    const { name, email } = req.body;
    if (!name || !email) {    // returns error if info is missing
        return res.status(400).json({ error: 'Bad Request' });
    }
    const newUser = { //formats user info
        id: crypto.randomUUID(),
        name,
        email
    };
    users.push(newUser); //stores user
    return res.status(201).json(newUser); //successful response
});

app.get('/users/:id', (req, res) => { //retrieves user
    const { id } = req.params; //gets id
    const user = users.find(u => u.id === id); //finds user
    if (!user) { //error if user does not exist
        return res.status(404).json({ error: 'Not Found' });
    }
    return res.status(200).json(user);//successful response
});

app.put('/users/:id', (req, res) => {//updates user
    const { id } = req.params; //gets id
    const { name, email } = req.body; //gets content
    if (!name || !email) { // error if request does not have required info
        return res.status(400).json({ error: 'Bad Request' });
    }
    const user = users.find(u => u.id === id); //looks for user
    if (!user) { //error if user doesn't exist
        return res.status(404).json({ error: 'Not Found' });
    }
    user.name = name; //updates user info
    user.email = email;    
    return res.status(200).json(user); //successful response
});

app.delete('/users/:id', (req, res) => { //deletes user
    const { id } = req.params; //gets id
    const userIndex = users.findIndex(u => u.id === id); //finds user
    if (userIndex === -1) { //error if user doesn't exist
        return res.status(404).json({ error: 'Not Found' });
    }
    users.splice(userIndex, 1); //deletes user
    return res.status(204).send(); //successful response
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
