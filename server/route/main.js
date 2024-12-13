const express = require('express');
const router = express.Router();

router.get('', (req, res) => {

    const locals = {
        title: "Destruti Website",
        description: "This is a new Destruti Website build in NodeJs and EJS",
    }
    
    res.render('index', { locals });

});

router.get('/about', (req, res) => {
    
    res.render('about');

});

module.exports = router;