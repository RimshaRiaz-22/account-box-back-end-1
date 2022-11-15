const notificationModel = require("../models/notificationModel");
const mongoose = require("mongoose");
const moment = require('moment');

// Get All notification 
exports.getAllnotifications = (req, res) => {
    notificationModel.find({}, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    }).sort({ $natural: -1 })
}
// Get notification 
exports.getSpecificnotification = (req, res) => {
    const notificationId = req.params.notificationId;
    notificationModel.find({ _id: notificationId }, function (err, foundResult) {
        try {
            res.json({data:foundResult})
        } catch (err) {
            res.json(err)
        }
    })
}
// Delete 
exports.deletenotification = (req, res) => {
    const notificationId = req.params.notificationId;
    notificationModel.findByIdAndDelete(notificationId, (error, result) => {
        if (error) {
            res.send({message:error.message})
        } else {
            res.json({ message: "Deleted Successfully" })
        }
    })
}
// Create 
exports.createnotification = async (req, res) => {
    const Createddate= req.body.dateTime;

    const notificationMessage = new notificationModel({
        _id: mongoose.Types.ObjectId(),
        from: req.body.from,
        to: req.body.to,
        msgContent: req.body.msgContent,
        dateTime:moment(Createddate).format("DD/MM/YYYY"),
        readStatus:false
    })
    notificationMessage.save((error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result)
        }
    })

}
// Update 
exports.updatenotification = async (req, res) => {
    const updateData = {
        readStatus:req.body.readStatus
    }
    const options = {
        new: true
    }
    notificationModel.findByIdAndUpdate(req.body._id, updateData, options, (error, result) => {
        if (error) {
            res.json(error.message)
        } else {
            res.send({data:result,message:"Updated Successfully"})
        }
    })
}



