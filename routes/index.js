const express     = require('express');
const router      = express.Router();
const auth        = require('./auth');

router.get('/', auth.CheckAuth, function(req, res) {
    res.render('index');  //render는 열어라  
});

module.exports = router;