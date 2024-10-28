const router = require("express").Router();

const Auth = require("./authRoute");
const User = require("./userRoute");
const Car = require("./carRoute");

const versionRoute = "/api/v1";

router.use(`${versionRoute}/auth`, Auth);
router.use(`${versionRoute}/users`, User);
router.use(`${versionRoute}/cars`, Car);

module.exports = router
