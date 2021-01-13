const cloudinary = require('cloudinary').v2
const textModels = require('../models/text')
const imageModels = require('../models/image')

cloudinary.config({
    cloud_name: 'tranhuycloud',
    api_key: '381621652747451',
    api_secret: 'FslI1DN5Eom0AWZe-9VeklvAwgQ'
})

exports.getAdd = async(req, res, next) => {
    res.render('add')
}

exports.getAddImage = async(req, res, next) => {
    res.render('addImage')
}

exports.getSite = async (req, res, next) => {
    res.render('site')
}

exports.addPost = async(req, res, next) => {
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

exports.addImage = async(req, res, next) => {
    const image = req.file.path.split('\\').slice(1).join('\\')

    const result = await cloudinary.uploader.upload(req.file.path)

    const newPost = {
        image : result.url
    }

    const post = new imageModels(newPost)
    post.save()

    res.redirect('/addImage')
}

exports.getManage = async(req, res, next) => {

    const textPost = await textModels.find()

    const imagePost = await imageModels.find()

    res.render('manage', { data1 : textPost, data2 : imagePost })
}

exports.deteleImage = async(req, res, next) => {
    const { id } = req.params
    console.log(id)
    const deteteImg = await imageModels.findByIdAndDelete(id)
    res.redirect('/manage')
}

exports.deteleText = async(req, res, next) => {
    const { id } = req.params
    console.log(id)
    const deteteText = await textModels.findByIdAndDelete(id)
    res.redirect('/manage')
}

exports.getEditImgae = async (req, res, next) => {
    const { id } = req.params

    const dataImage = await imageModels.findById(id)

    console.log(dataImage._id)

    res.render('editImage', { data : dataImage })
}

exports.getEditText = async (req, res, next) => {
    const { id } = req.params

    const textPost = await textModels.findById(id)

    console.log(textPost)

    res.render('editText', { textPost : textPost })
}

exports.editText = async (req, res, next) => {
    const { id } = req.params

    console.log(req.body)

    const {
        text
    } = req.body
    console.log(text)

    // const image = req.file.path.split('\\').slice(1).join('\\')

    // const result = await cloudinary.uploader.upload(req.file.path)

    const updatePost = {
        text : text
        // image : result.url
    }

    // const update = await textModels.findByIdAndUpdate(id, updatePost)

    // res.redirect('/manage')
}

exports.editImage = async (req, res, next) => {
    const { id } = req.params

    const image = req.file.path.split('\\').slice(1).join('\\')

    const result = await cloudinary.uploader.upload(req.file.path)

    const updatePost = {
        image : result.url
    }

    console.log(updatePost)

    const update = await imageModels.findByIdAndUpdate(id, updatePost)

    res.redirect('/manage')
}