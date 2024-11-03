const router = require("express").Router();

const { UserController } = require("../../app/controllers/api/v1");
const { uploader, authenticated, authorize } = require("../../app/middlewares");

router.get("/", authenticated, authorize('superadmin'), UserController.getAllUsers);
router.get("/:id", authenticated, authorize('superadmin'), UserController.getUserbyId);
router.post("/", authenticated, authorize('superadmin'), uploader.single("fotoProfil"), UserController.createUser);
router.get("/current/user", authenticated, authorize('superadmin'), UserController.currentUser);
// router.patch("/:id", uploader.single("fotoProfil"), UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);


module.exports = router;