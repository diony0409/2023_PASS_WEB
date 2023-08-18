module.exports = {
    CheckAuth: async function(req, res, next) {
            console.log("hello");
        if(req.isAuthenticated()) {
            console.log('hello');
            next();
        }
        else {
            res.redirect('/user/signin');
        }
    },
}