const cloudinary = require('cloudinary').v2
const textModels = require('../models/text')
const imageModels = require('../models/image')

cloudinary.config({
    cloud_name: 'tranhuycloud',
    api_key: '381621652747451',
    api_secret: 'FslI1DN5Eom0AWZe-9VeklvAwgQ'
})

const getAdd = async(req, res, next) => {
    res.render('add')
}

const getAddImage = async(req, res, next) => {
    res.render('addImage')
}

const getSite = async (req, res, next) => {
    res.render('site')
}

const addPost = async(req, res, next) => {
    const {
        text
    } = req.body

    const image = req.file.path.split('\\').slice(1).join('\\')

    const result = await cloudinary.uploader.upload(req.file.path)

    const newPost = {
        text : text,
        image : result.url
    }

    const post = new textModels(newPost)
    post.save()

    res.redirect('/add')
}

const addImage = async(req, res, next) => {
    const image = req.file.path.split('\\').slice(1).join('\\')

    const result = await cloudinary.uploader.upload(req.file.path)

    const newPost = {
        image : result.url
    }

    const post = new imageModels(newPost)
    post.save()

    res.redirect('/addImage')
}

const getManage = async(req, res, next) => {
    res.render('manage')
}

module.exports = {
    getAdd,
    addPost,
    addImage,
    getAddImage,
    getSite,
    getManage
}