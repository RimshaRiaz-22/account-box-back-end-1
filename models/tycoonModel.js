const mongoose = require("mongoose");
const tycoonSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    username: String,
    profile_image: String,
    status: String,
    no_of_shops_created: String,
    created_at: String,

}
);
module.exports = mongoose.model("tycoon", tycoonSchema);