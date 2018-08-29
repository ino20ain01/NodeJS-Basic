var express = require('express');
var router = express.Router();
import { Category } from '../db';

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

router.get('/list-categories', async function(req, res, next) {
    let listCategories = await Category.find();
    res.render('category/list_categories', {listCategories} );
});

router.get('/form-category/:cateId?', async function ( req, res, next) {
    let { cateId } = req.params;
    let category = {};
    if (cateId) {
        category = await Category.findOne({ id: cateId })
    } ;
    
    res.render('category/form_category', { category });
});

router.get('/action-remove/:cateId?', async function ( req, res, next) {
    let { cateId } = req.params;
    if (cateId) {
        await Category.findOneAndRemove({ id: cateId });
    }

    res.redirect('/list-categories');
});

router.post('/action-save', async function ( req, res, next) {
    let { category_id } = req.body,
        { title }  = req.body,
        { description } = req.body;
    if (category_id) {
        await Category.findOneAndUpdate({ id: category_id }, { $set: { title, description } });
    } else {
        await Category.create(req.body);
    }

    res.redirect('/list-categories');
});


module.exports = router;
