const express = require('express');
const router = express.Router();

//Required api's 
const ImageUpload = require('./Routes/ImageUpload')
const Admin = require('./Routes/Admin')
const SubscriptionPlan = require('./Routes/SubscriptionPlan')
const Tycoon = require('./Routes/Tycoon')
const Managers = require('./Routes/Managers')
const Shop = require('./Routes/Shops')
const Products = require('./Routes/Product')
const Cashier = require('./Routes/Cashier')
const ShopProducts = require('./Routes/ShopProduct')
const ShopCashiers = require('./Routes/ShopCashier')
const Inventory = require('./Routes/Inventory')
const daily_Assigned_fund = require('./Routes/daily_Assigned_fundRoute')
const expenses = require('./Routes/expenses')
const balance_account = require('./Routes/balance_account')



/*********Main Api**********/

router.use('/Upload', ImageUpload);
router.use('/admin',Admin);
router.use('/subscriptionPlan',SubscriptionPlan);
router.use('/tycoon',Tycoon);
router.use('/managers',Managers);
router.use('/shop',Shop);
router.use('/product',Products);
router.use('/cashier',Cashier);
router.use('/shopProducts',ShopProducts);
router.use('/shopCashiers',ShopCashiers);
router.use('/inventory',Inventory);
router.use('/daily_Assigned_fund',daily_Assigned_fund);
router.use('/expenses',expenses);
router.use('/balance_account',balance_account);












module.exports = router;