const router = require("express").Router();
const controller= require("../../Services/shopProductServices")

router.get("/get-all" ,controller.getAllShopProducts)
router.get("/get-ShopProduct-by-ID/:ShopProductId" , controller.getSpecificShopProduct)
router.get("/get-all-shop-products/:shop_id" , controller.getSingleShopProduct)

router.delete("/delete/:ShopProductId" , controller.deleteShopProduct);
router.post("/create" , controller.createShopProduct);

module.exports = router;