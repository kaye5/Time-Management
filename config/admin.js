const passport = require("passport");
exports.requireAuth = passport.authenticate("jwtAdmin", { session: false });
exports.requireLogin = passport.authenticate("user", { session: false });