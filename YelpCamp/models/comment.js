const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String,
            default: 'Admin'
        }
    }
});

module.exports = mongoose.model("Comment", commentSchema);
