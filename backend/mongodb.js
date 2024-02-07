const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongodbURI = 'mongodb+srv://webdevelopment:webdevelopment@webdevelopment.j31tash.mongodb.net/Webdevelopment?retryWrites=true&w=majority';
const databaseName = 'Webdevelopment';

const dbconnection = new MongoClient(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });

dbconnection.connect()
    .then(() => {
        console.log('Connected to mongodb');

        const database = dbconnection.db(databaseName)
        const formDataCollection = database.collection("ReactFormData");

        app.post('/api/mongodb', async (req, res) => {
            const { name, email, phone } = req.body;

            try {
                await formDataCollection.insertOne({ name, email, phone });

                console.log("Data submitted to mongodb")
                res.send("Submitted")
            } catch (error) {
                console.log("Error : ", error)
            }
        })
    })

const port = 3001;
app.listen(port, () => {
    console.log(`started at ${port}`)
})