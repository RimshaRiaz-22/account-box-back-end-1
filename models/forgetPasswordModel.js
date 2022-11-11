const mongoose = require("mongoose");
const forgetPasswordSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    code: String,
    expiresIn: String
}
);
module.exports = mongoose.model("forgetPassword", forgetPasswordSchema);