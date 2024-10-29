const router = require("express").Router();

const { UserController } = require("../controllers/api/v1");
const { uploader } = require("../middlewares");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserbyId);
router.post("/", uploader.single("fotoProfil"), UserController.createUser);
// router.patch("/:id", uploader.single("fotoProfil"), UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);


module.exports = router;