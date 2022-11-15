const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: String,
    to: String,
    msgContent: String,
    dateTime: String,
    readStatus: Boolean
}
);
module.exports = mongoose.model("notification", notificationSchema);