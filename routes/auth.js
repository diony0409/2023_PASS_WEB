module.exports = {
    CheckAuth: async function(req, res, next) {
        console.log(req);
        if(req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/user/signin');
        }
    },
}