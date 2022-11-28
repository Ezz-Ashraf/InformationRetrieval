const path=require('path');
const express=require('express');
const router=express.Router();

const homeController = require('../controllers/home');

router.get('/',homeController.homePage);
router.post('/',homeController.setQuery);
router.get('/report/:queryText',homeController.printReport);
module.exports=router;
