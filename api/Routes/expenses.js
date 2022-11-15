const router = require("express").Router();
const controller= require("../../Services/expensesServices")

router.get("/get-all" ,controller.getAllexpenses)
router.get("/get-expenses-by-ID/:expensesId" , controller.getSpecificexpense)
router.get("/get-expenses-by-shopId/:shop_id" , controller.getFundsByShopId)
router.get("/get-expenses-by-date/:created_at" , controller.getFundsByDate)
router.delete("/delete/:expensesId" , controller.deleteexpense);
router.post("/create" , controller.createexpense);
router.put("/update" , controller.updateexpense);

module.exports = router;