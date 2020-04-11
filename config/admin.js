const passport = require("passport");
exports.requireAuth = passport.authenticate("jwtAdmin", { session: false });