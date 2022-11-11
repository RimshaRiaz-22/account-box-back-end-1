const router = require("express").Router();
const controller= require("../../Services/inventoryServices")

router.get("/get-all" ,controller.getAllInventorys)
router.get("/get-Inventory-by-ID/:InventoryId" , controller.getSpecificInventory)
router.get("/get-single-shop-inventorys/:shop_id" , controller.getShopInventory)

router.delete("/delete/:InventoryId" , controller.deleteInventory);
router.post("/create" , controller.createInventory);
router.put("/update" , controller.updateInventory);

module.exports = router;