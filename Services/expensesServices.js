const expensesModel = require("../models/expensesModel");
const mongoose = require("mongoose");
const moment = require('moment');
const managersModel = require("../models/managersModel");
const shopsModel = require("../models/shopsModel");

// Get All expense 
exports.getAllexpenses = (req, res) => {
    expensesModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get expense 
exports.getSpecificexpense = (req, res) => {
    const expenseId = req.params.expensesId;
    expensesModel.find({ _id: expenseId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get expense by shop Id
exports.getFundsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    expensesModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })
}

// Delete 
exports.deleteexpense = (req, res) => {
    const expenseId = req.params.expensesId;
    expensesModel.findByIdAndDelete(expenseId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createexpense = async (req, res) => {
    const Createddate= req.body.created_at;
    shopsModel.find({ _id: req.body.shop_id}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result[0].manager_id)
            const ManagerId=result[0].manager_id
            if (result[0].manager_id === undefined || result[0].manager_id == '') {
                res.json({ data: result, message: "ManagerId not exist for this shop" })
            } else {
                const expense = new expensesModel({
                    _id: mongoose.Types.ObjectId(),
                    manager_id: ManagerId,
                    shop_id: req.body.shop_id,
                    reason_of_amount:req.body.reason_of_amount,
                    amount: req.body.amount,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                expense.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            }
        }
    })

}
// Update 
exports.updateexpense = async (req, res) => {
    const updateData = {
        reason_of_amount:req.body.reason_of_amount,
        amount: req.body.amount,
    }
    const options = {
        new: true
    }
    expensesModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



