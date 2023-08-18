module.exports = {
    CheckAuth: async function(req, res, next) {
        console.log(req);
        if(req.isAuthenticated()) {
            console.log('auth');
            next();
        }
        else {
            res.redirect('/user/signin');
        }
    },
}