const passport = require("passport");
exports.requireAuth = passport.authenticate("jwtUser", { session: false });
exports.requireLogin = passport.authenticate("user", { session: false });