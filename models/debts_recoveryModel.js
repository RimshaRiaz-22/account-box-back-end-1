const mongoose = require("mongoose");
const debts_recoverySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    debt_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'debts'
    },
    shop_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    amount_recovered:String,
    recovery_date:String
}
);
module.exports = mongoose.model("debts_recovery", debts_recoverySchema);