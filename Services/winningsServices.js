const winningModel = require("../models/winnings");
const mongoose = require("mongoose");
const moment = require('moment');
const shopsModel = require("../models/shopsModel");

// Get All winning 
exports.getAllwinnings = (req, res) => {
    winningModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get winning 
exports.getSpecificwinning = (req, res) => {
    const winningId = req.params.winningsId;
    winningModel.find({ _id: winningId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get winning by shop Id
exports.getWinningsByShopId = (req, res) => {
    const ShopId = req.params.shop_id;
    winningModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get turnover by date
exports.getWinningsByDate = (req, res) => {
    const Createddate = req.params.created_at;
    winningModel.find({ created_at: moment(Createddate).format("DD/MM/YYYY") }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deletewinning = (req, res) => {
    const winningId = req.params.winningsId;
    winningModel.findByIdAndDelete(winningId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createwinning = async (req, res) => {
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
                const winning = new winningModel({
                    _id: mongoose.Types.ObjectId(),
                    manager_id: ManagerId,
                    shop_id: req.body.shop_id,
                    name:req.body.name,
                    amount: req.body.amount,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                winning.save((error, result) => {
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
exports.updatewinning = async (req, res) => {
    const updateData = {
        name:req.body.name,
     amount: req.body.amount,
    }
    const options = {
        new: true
    }
    winningModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



