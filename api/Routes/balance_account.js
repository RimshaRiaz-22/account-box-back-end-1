const router = require("express").Router();
const controller= require("../../Services/balance_accountServices")

router.get("/get-all" ,controller.getAllbalance_accounts)
router.get("/get-BalanceAccount-by-ID/:balance_accountsId" , controller.getSpecificbalance_account)
router.get("/get-Shop-BalanceAccount/:shop_id" , controller.getAllBalanceAccountByShopId)

router.delete("/delete/:balance_accountsId" , controller.deletebalance_account);
router.post("/create" , controller.createbalance_account);
router.put("/update" , controller.updatebalance_account);

module.exports = router;