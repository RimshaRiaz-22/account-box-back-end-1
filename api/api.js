const express = require('express');
const router = express.Router();

//Required api's 
const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const SubscriptionPlan = require('./Routes/SubscriptionPlan')
const Tycoon = require('./Routes/Tycoon')

/*********Main Api**********/

router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/subscriptionPlan',SubscriptionPlan);
router.use('/tycoon',Tycoon);


module.exports = router;