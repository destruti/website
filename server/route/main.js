const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('', async (req, res) => {

    try {

        const locals = {
            title: "Eduardo Destruti",
            url: process.env.URL_WEBSITE,
            description: "This is a personal Eduardo Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
            meta_description: "This is a new Eduardo Destruti Website build in NodeJs and EJS",
            meta_og_image: process.env.URL_WEBSITE+"/img/posts/post_20years.jpg",
        };

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
            description: data.meta_description,
            meta_description: data.meta_description,
            meta_og_image: data.meta_og_image,
            url: process.env.URL_WEBSITE+'/post/' + req.params.id,
        };

        res.render('post', { locals, data });

    } catch (error) {
        console.log(error)
    }

});

router.post('/search', async (req, res) => {
    
    try {

        const locals = {
            title: "Eduardo Destruti",
            url: process.env.URL_WEBSITE+"/search",
            description: "This is a personal Eduardo Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
            meta_description: "This is a new Eduardo Destruti Websitebuild in NodeJs and EJS",
            meta_og_image: process.env.URL_WEBSITE+"/img/posts/post_20years.jpg",
        };

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
        title: "Eduardo Destruti",
        url: process.env.URL_WEBSITE+"/about",
        description: "This is a personal Eduardo Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
        meta_description: "This is a new Eduardo Destruti Websitebuild in NodeJs and EJS",
        meta_og_image: process.env.URL_WEBSITE+"/img/posts/post_20years.jpg",
    };
    
    res.render('pages/about', {
        locals,
    });

});

router.get('/courses', async (req, res) => {

    const locals = {
        title: "Eduardo Destruti",
        url: process.env.URL_WEBSITE+"/about",
        description: "This is a personal Eduardo Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
        meta_description: "This is a new Eduardo Destruti Websitebuild in NodeJs and EJS",
        meta_og_image: process.env.URL_WEBSITE+"/img/posts/post_20years.jpg",
    };

    res.render('pages/courses', {
        locals,
    });

});

router.get('/posts', async (req, res) => {

    try {

        const locals = {
            title: "Eduardo Destruti",
            url: process.env.URL_WEBSITE+"/about",
            description: "This is a personal Eduardo Destruti Website <a href='https://github.com/destruti/website' target='_blank'>(Github)</a>" ,
            meta_description: "This is a new Eduardo Destruti Websitebuild in NodeJs and EJS",
            meta_og_image: process.env.URL_WEBSITE+"/img/posts/post_20years.jpg",
        };

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