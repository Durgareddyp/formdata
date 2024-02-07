const express = require("express")
const mysql = require("mysql")
const bodyparser = require("body-parser")
const cors = require("cors")


const app = express()
const port = 3001

app.use(bodyparser.json())
app.use(cors())

const dbconnection = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6680145',
    password: 'j6ADkRSbCQ',
    database: 'sql6680145',
})

dbconnection.connect((err) => {
    if (err) {
        console.error("ERROR", err)
    } else {
        console.log("Connected to db")
    }
})

app.post('/api/mysql', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO uidb (name, email, phone) VALUES (?, ?, ?)`;
    dbconnection.query(query, [data.name, data.email, data.phone], (err, result) => {
        if (err) {
            console.error("ERROR", err);
            res.status(500).send({ error: "Error inserting data" });
        } else {
            console.log('Data submitted successfully');
            res.status(200).send({ success: true, result });
        }
    });
});


// app.get("/", (req, res) => {
//     console.log("home")
//     res.send("home")
// })

app.listen(port, () => {
    console.log(`Started at ${port}`)
})