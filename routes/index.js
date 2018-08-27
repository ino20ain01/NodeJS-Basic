var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Hello Express' });
});

router.get('/about', function (req, res, next) {
    res.render('about', { content: 'About Page' });
});

router.get('/check-tam-giac/:canhA/:canhB/:canhC', function (req, res, next) {
    let { canhA } = req.params;
    let { canhB } = req.params;
    let { canhC } = req.params;

    res.render('math/triangle', {
        canhA: Number(canhA),
        canhB: Number(canhB),
        canhC: Number(canhC)
    });
});

module.exports = router;
