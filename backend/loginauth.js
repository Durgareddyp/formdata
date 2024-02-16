const express = require('express')
const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express()
const port = 3001;

app.use(cors())
const users = [
    { id: 1, username: 'durga', password: '$2a$10$I4W70H0042tLFi5zTwLHJOvEKY5Y8DylZJKF1./jfZT4.rd0X9U36' }
]
const Key = "durgaaa"

app.use(bodyparser.json())

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.send('No user found')
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.send('Invalid password')
    }

    const token = jwt.sign(
        { id: user.id, username: user.username }, Key, { expiresIn: '10s' }
    );

    res.json({ token });



})

app.listen(port, () => {
    console.log('started')
})