const router = require("express").Router();

const { UserController } = require("../controllers/api/v1");
const { uploader, authenticated, authorize } = require("../middlewares");

router.get("/", authenticated, authorize('superadmin'), UserController.getAllUsers);
router.get("/:id", authenticated, authorize('superadmin'), UserController.getUserbyId);
router.post("/", authenticated, authorize('superadmin'), uploader.single("fotoProfil"), UserController.createUser);
// router.patch("/:id", uploader.single("fotoProfil"), UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);


module.exports = router;