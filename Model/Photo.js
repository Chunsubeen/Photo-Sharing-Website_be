const mongoose = require('mongoose');
const User = require("./User");
const Schema = mongoose.Schema;


const photoSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 300,
    },

    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    country: {
        type: String,
        required: true
    }
}, { timestamps: true });

photoSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    delete obj.createdAt;
    return obj;
};



const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
