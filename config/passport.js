const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const userDB = require('../database/user');

passport.use('user',new LocalStrategy({ usernameField: 'nim' }, async (nim, password, done) => {
      let user = await userDB.findOne({id : nim,password})
      // Match user
      if(user){
          return done(null,user)
      } 
      else 
        return done('Incorrect password')
    })
);

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('jwtAdmin',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWTSECRET
    },
    async(payload, done) =>{
      try {
        let user = await userDB.findOne({id : payload.user.id,password : payload.user.password})
        if (!user && user.role != 'admin') return done(null, false, { message: "Invalid username or password" })
        if (payload.exp > Date.now()) return done(null, false, { message: "Your session has expired!" });
        done(null, user);
      } catch (error) {
        console.log(error);
        done(null, false, { message: "Something went wrong, please try again" });
      }
    }
));
passport.use('jwtUser',new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWTSECRET
},
async(payload, done) =>{
  try {
    let user = await userDB.findOne({id : payload.user.id,password : payload.user.password})
    if (!user) return done(null, false, { message: "Invalid username or password" })
    if (payload.exp > Date.now()) return done(null, false, { message: "Your session has expired!" });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(null, false, { message: "Something went wrong, please try again" });
  }
}
));
