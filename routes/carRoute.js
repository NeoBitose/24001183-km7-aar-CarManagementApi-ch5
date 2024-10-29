const router = require("express").Router();

const { CarController } = require("../controllers/api/v1");
const { uploader } = require("../middlewares");

router.get("/", CarController.getAllCars);
router.get("/:id", CarController.getCarbyId);
router.post("/", uploader.single("fotoMobil"), CarController.createCar);
router.patch("/:id", uploader.single("fotoMobil"), CarController.updateCar);
router.delete("/:id", CarController.deleteCar);

module.exports = router;