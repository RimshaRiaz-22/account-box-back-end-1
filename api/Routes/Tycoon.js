const router = require("express").Router();
const controller= require("../../Services/TycoonServices")

router.get("/get-all" ,controller.getAllTycoons)
router.get("/get-Tycoon-by-ID/:TycoonId" , controller.getSpecificTycoon)
router.delete("/delete/:TycoonId" , controller.deleteTycoon);
router.post("/create" , controller.createTycoon);
router.put("/update-credentials" , controller.updateTycoon);
router.put("/login" , controller.loginTycoon);
router.post("/forget-password" , controller.forgetPasswordTycoon);


module.exports = router;