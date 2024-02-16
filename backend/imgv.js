const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

const app = express()
const port = 3001;

app.use(cors())
app.use(express.json())

// database
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

// cloudinary
cloudinary.config({
    cloud_name: 'dl82zmsqz',
    api_key: '164853395129515',
    api_secret: 'Cgk21aFkffyJHJUN67Ktja4K5Mk'
});

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'web',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(undefined, file.orginalname);
    }
});

var parser = multer({ storage: storage });


// post
app.post('api/imgv', parser.array('images', 2), (req, res) => {

    const urls = [];
    console.log(req.files)

    req.files.forEach(file => {
        urls.push(file.url);
        console.log(file.url)
    })
    res.send(urls)

    const query = `INSERT INTO imgs (urls) VALUES ?;`;
    dbconnection.query(query, [urls.map(url => [url])], (error, result) => {
        if (error) {
            console.log("error", error)

        } else {
            console.log("uploaded to mysql")
            console.log(result)
        }
    })
})

app.get('/imageviewer', (req, res) => {
    const query = `SELECT urls FROM imgs;`
    dbconnection.query(query, (err, rows) => {
        if (err) {
            console.error("Error while selecting form db")
        } else {
            console.log(rows)
            // const imgurls = rows.map(url = url.)
        }
    })
})

app.listen(port, () => {
    console.log(`stated at ${port}`)
})