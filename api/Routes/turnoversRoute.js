const router = require("express").Router();
const controller= require("../../Services/turnoverServices")

router.get("/get-all" ,controller.getAllturnovers)
router.get("/get-turnovers-by-ID/:turnoversId" , controller.getSpecificturnover)
router.get("/get-turnovers-by-shopId/:shop_id" , controller.getFundsByShopId)
router.delete("/delete/:turnoversId" , controller.deleteturnover);
router.post("/create" , controller.createturnover);
router.put("/update" , controller.updateturnover);

module.exports = router;