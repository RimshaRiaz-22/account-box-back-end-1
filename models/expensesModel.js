const mongoose = require("mongoose");
const expensesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    manager_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tycoon'
    },
    reason_of_amount: String,
    amount: String,
    created_at: String,
}
);
module.exports = mongoose.model("expenses", expensesSchema);