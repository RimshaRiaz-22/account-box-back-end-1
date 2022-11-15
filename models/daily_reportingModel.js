const mongoose = require("mongoose");
const daily_reportingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: String,
   manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'managers'
    },
    balance_account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'balance_account'
    },
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    turnover_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'turnovers'
    }],
    winning_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'winnings'
    }],
    status: {
        type: String,
        enum: ['created', 'approved','rejected','editable']
    },
    ismodified:Boolean,
    modified_at:String,
    comments_for_manager: String,
}
);
module.exports = mongoose.model("daily_reporting", daily_reportingSchema);