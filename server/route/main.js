const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {

    try {

        const locals = {
            title: "Destruti Website",
            description: "This is a personal Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
        }
        // const data = await Post.find();

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error)
    }


});


router.get('/post/:id', async (req, res) => {

    try {

        let slug = req.params.id
        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "This is a new Destruti Website build in NodeJs and EJS",
        }

        res.render('post', { locals, data });

    } catch (error) {
        console.log(error)
    }


});


router.post('/search', async (req, res) => {
    try {

        const locals = {
            title: "Seach",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });

        res.render("search", {
            data,
            locals,
            currentRoute: '/'
        });

    } catch (error) {
        console.log(error);
    }

});


router.get('/about', async (req, res) => {

    const locals = {
        title: "Destruti Website",
        description: "This is a personal Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
    }
    res.render('pages/about', {
        locals,
    });

});

router.get('/courses', async (req, res) => {

    const locals = {
        title: "Destruti Website",
        description: "This is a personal Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
    }
    res.render('pages/courses', {
        locals,
    });

});

router.get('/posts', async (req, res) => {

    try {

        const locals = {
            title: "Destruti Website",
            description: "This is a personal Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
        }
        // const data = await Post.find();

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('pages/posts', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error)
    }


});

module.exports = router;