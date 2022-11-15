const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All Inventory 
exports.getAllInventorys = (req, res) => {
    inventoryModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
    .populate('shop_id')
    .populate('manager_id')
}
// Get Inventory 
exports.getSpecificInventory = (req, res) => {
    const InventoryId = req.params.InventoryId;
    inventoryModel.find({ _id: InventoryId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult })
        } catch (err) {
            res.json(err)
        }
    }) .populate('shop_id')
    .populate('manager_id')
}
// Get Shop Inventory 
exports.getShopInventory = (req, res) => {
    const ShopId = req.params.shop_id;
    inventoryModel.find({ shop_id: ShopId }, function (err, foundResult) {
        try {
            res.json({ data: foundResult ,count:foundResult.length})
        } catch (err) {
            res.json(err)
        }
    }) .populate('shop_id')
    .populate('manager_id')
}

// Delete 
exports.deleteInventory = (req, res) => {
    const InventoryId = req.params.InventoryId;
    inventoryModel.findByIdAndDelete(InventoryId, (error, result) => {
        if (error) {
            res.send({ message: error.message })
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createInventory = async (req, res) => {
    inventoryModel.find({ shop_id: req.body.shop_id ,serial_no:req.body.serial_no}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            // res.send(result)
            if (result === undefined || result.length == 0) {
                const Inventory = new inventoryModel({
                    _id: mongoose.Types.ObjectId(),
                    shop_id: req.body.shop_id,
                    manager_id: req.body.manager_id,
                    serial_no: req.body.serial_no,
                    equipment_name: req.body.equipment_name,
                    quantity: req.body.quantity,
                    created_by: req.body.created_by,

                });
                Inventory.save((error, result) => {
                    if (error) {
                        res.send(error)
                    } else {
                        res.json({ data: result, message: "Created Successfully" })
                    }
                })

            } else {
                res.json({ data: result, message: "Inventory Already Exists for this SErial No and Shop Id" })

            }
        }
    })

}
// Update 
exports.updateInventory = async (req, res) => {
    const updateData = {
        serial_no: req.body.serial_no,
        equipment_name: req.body.equipment_name,
        quantity: req.body.quantity,
    }
    const options = {
        new: true
    }
    inventoryModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({ data: result, message: "Updated Successfully" })
        }
    })
}



