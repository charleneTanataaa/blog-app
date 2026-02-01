const mangoose = require('mongoose');
const PostSchema = new mangoose.Schema(
    {
        "title": {
            type: String,
            required: true,
        },
        "content": {
            type: String,
            required: true
        },
        "author": {
            type: mangoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
)
module.exports = mangoose.model("Post", PostSchema);