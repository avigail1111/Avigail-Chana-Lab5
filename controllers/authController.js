const passport = require("../config/passport")


module.exports = {
    loginView: (req, res, next) => {
        if (req.session.userId === undefined) {
            req.session.referer = req.get('Referer')
            if (req.session.referer === undefined) {
                req.session.referer = '/'
            }
          
            return res.render("auth/login", { title: "login", header: "" })
        }
        else {
            res.locals.redirect = "/"
            next()
        }
    },
    authenticate: (req, res, next) => {
        passport.authenticate("local", {
        }, function (err, user, info) {
            if (err) {
                return next(err)
            }
            if (!user) {
               
                return res.redirect('/auth/login')
            }

            req.logIn(user, function (error) {//Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
                if (error) {
                    return next(error)
                }
                //delete req.session.badLogin
                req.session.userId = user.id
                req.session.admin = user.admin
                req.session.userName = user.name
               
                req.session.referer = req.session.referer === "http://localhost:3000/auth/login" ? "http://localhost:3000/" : req.session.referer
                return res.redirect(req.session.referer)
            })
        })(req, res, next)
    },

    logout: (req, res, next) => {
        req.logOut()//. Invoking logout() will remove the req.user property and clear the login session (if any).
        req.session.regenerate(() => {
            res.locals.redirect = "/auth/login"
            next()
        })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect
        if (redirectPath != undefined) res.redirect(redirectPath)
        else next()
    }
}