const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require("./routes/index");
const path = require('path');
const app = express();

require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", indexRouter);


const mongoURI = process.env.LOCAL_DB_ADDRESS;
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log("DB connection fail", err));

app.listen(process.env.PORT || 5001, () => {
    console.log(`Server running on port ${process.env.PORT || 5001}`);
});
