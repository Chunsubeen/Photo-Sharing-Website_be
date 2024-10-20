const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
