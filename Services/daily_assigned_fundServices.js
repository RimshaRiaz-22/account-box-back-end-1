const daily_assigned_fundModel = require("../models/daily_assigned_fund");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All daily_assigned_fund 
exports.getAlldaily_assigned_funds = (req, res) => {
    daily_assigned_fundModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get daily_assigned_fund 
exports.getSpecificdaily_assigned_fund = (req, res) => {
    const daily_assigned_fundId = req.params.daily_assigned_fundsId;
    daily_assigned_fundModel.find({ _id: daily_assigned_fundId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get daily_assigned_fund by Tycoon Id
exports.getFundsByTycoonId = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    daily_assigned_fundModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get daily_assigned_fund by shop Id
exports.getFundsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    daily_assigned_fundModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })
}

// Delete 
exports.deletedaily_assigned_fund = (req, res) => {
    const daily_assigned_fundId = req.params.daily_assigned_fundsId;
    daily_assigned_fundModel.findByIdAndDelete(daily_assigned_fundId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createdaily_assigned_fund = async (req, res) => {
    const Createddate= req.body.date;
    daily_assigned_fundModel.find({ tycoon_id: req.body.tycoon_id,shop_id: req.body.shop_id ,date:moment(Createddate).format("DD/MM/YYYY")}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const daily_assigned_fund = new daily_assigned_fundModel({
                    _id: mongoose.Types.ObjectId(),
                    tycoon_id: req.body.tycoon_id,
                    shop_id: req.body.shop_id,
                    amount: req.body.amount,
                    date:moment(Createddate).format("DD/MM/YYYY")

                });
                daily_assigned_fund.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "daily_assigned_fund Already Exists for this Tycoon Id and Shop Id" })

            }
        }
    })

}
// Update 
exports.updatedaily_assigned_fund = async (req, res) => {
    const updateData = {
        amount: req.body.amount,
    }
    const options = {
        new: true
    }
    daily_assigned_fundModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



