const router = require("express").Router();

const { UserController } = require("../controllers/api/v1");
const { uploader, authenticated, roles } = require("../middlewares");

router.get("/", authenticated, roles('superadmin'), UserController.getAllUsers);
router.get("/:id", authenticated, roles('superadmin'), UserController.getUserbyId);
router.post("/", authenticated, roles('superadmin'), uploader.single("fotoProfil"), UserController.createUser);
// router.patch("/:id", uploader.single("fotoProfil"), UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);


module.exports = router;