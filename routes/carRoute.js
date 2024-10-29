const router = require("express").Router();

const { CarController } = require("../controllers/api/v1");
const { uploader, authenticated, roles } = require("../middlewares");

router.get("/", authenticated, CarController.getAllCars);
router.get("/:id", authenticated, CarController.getCarbyId);
router.post("/", authenticated, roles('superadmin', 'admin'), uploader.single("fotoMobil"), CarController.createCar);
router.patch("/:id", authenticated, roles('superadmin', 'admin'), uploader.single("fotoMobil"), CarController.updateCar);
router.delete("/:id", authenticated, roles('superadmin', 'admin'), CarController.deleteCar);

module.exports = router;