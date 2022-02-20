require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const router = require('./src/routes/router');
const ImageModel = require('./src/models/Image');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const URI = process.env.MONGO_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to mongodb');
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }

//upload
const storage = multer.diskStorage({
    destination: './public',
    filename(req, file, cb) {
        cb(null, "google-form-content-questions-" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

//routes
app.get('/', async (req, res) => {
    try {
        var result = await ImageModel.find().lean();
        res.send(result);
    } catch (e) {
        res.send(e);
    }
});


app.post('/', upload.single('myfile'), async (req, res) => {
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..

    var data = {
        image: req.file.filename
    }
    var newImage = new ImageModel(data);
    await newImage.save().then((docs) => {
        console.log(docs);
        res.json({
            image: docs.image,
            host: req.protocol + '://' + req.get('host')
        })

    });
});

app.use('/api', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port', port);
})