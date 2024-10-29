const uploader = require("./uploaderMiddleware");
const authenticated = require("./authenticatedMiddleware");
const roles = require("./roleMiddleware")

module.exports = {
    uploader,
    authenticated,
    roles
}