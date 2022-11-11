const shopsModel = require("../models/shopsModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All Shop 
exports.getAllShops = (req, res) => {
    shopsModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get Shop 
exports.getSpecificShop = (req, res) => {
    const ShopId = req.params.ShopId;
    shopsModel.find({ _id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    })
}
// Get Tycoon Shops 
exports.getTycoonShops = (req, res) => {
    const TycoonId = req.params.tycoon_id;
    shopsModel.find({ tycoon_id: TycoonId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
}
// Get Manager Shops 
exports.getManagerShops = (req, res) => {
    const ManagerId = req.params.ManagerId;
    shopsModel.find({ manager_id: ManagerId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult,count:foundResult.length })
        } catch (err) {
            res.json(err)
        }
    }).sort({ $natural: -1 })
}
// Delete 
exports.deleteShop = (req, res) => {
    const ShopId = req.params.ShopId;
    shopsModel.findByIdAndDelete(ShopId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createShop = async (req, res) => {
    const Createddate= req.body.created_at;
    shopsModel.find({ name: req.body.name }, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Shop = new shopsModel({
                    _id: mongoose.Types.ObjectId(),
                    tycoon_id: req.body.tycoon_id,
                    manager_id: req.body.manager_id,
                    name: req.body.name,
                    img: req.body.img,
                    created_at:moment(Createddate).format("DD/MM/YYYY")

                });
                Shop.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Shop Already Exists for this name" })

            }
        }
    })

}
// Update 
exports.updateShop = async (req, res) => {
    const updateData = {
        name: req.body.name,
        img: req.body.img,
    }
    const options = {
        new: true
    }
    shopsModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



