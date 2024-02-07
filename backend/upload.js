const express = require("express")
const multer = require('multer')
const cloudinary = require('cloudinary')
var cloudinaryStorage = require('multer-storage-cloudinary');
const cors = require('cors')


const app = express()
const port = 3001

app.use(cors())
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


app.post('/api/upload', parser.array('images', 2), (req, res) => {

  const urls = [];

  console.log(req.files)

  req.files.forEach(file => {
    urls.push(file.url);
    console.log(file.url)
  })
  res.send(urls)


})



app.listen(port, () => {
  console.log(`server started at ${port}`)
})