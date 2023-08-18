module.exports = {
    CheckAuth: async function(req, res, next) {
            console.log("hello");
        if(req.isAuthenticated()) {
            console.log('로그인 된 사용자입니다.');
            next();
        }
        else {
            res.redirect('/user/signin');
        }
    },
}