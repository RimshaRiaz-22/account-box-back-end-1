const mongoose = require("mongoose");
const shopCashierSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    cashier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cashier'
    },
    created_at: String,
}
);
module.exports = mongoose.model("shopCashier", shopCashierSchema);