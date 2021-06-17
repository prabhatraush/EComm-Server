const mongoose = require('mongoose');
const slugify = require('slugify');
const shortid = require('shortid');

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    }
})

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `${slugify(this.name)}-${shortid()}`;
        }
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: [{
        img: {
            type: String
        }
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    brand: {
        type: String,
        required: true
    }, // Brand/Company Name
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }, // Overall rating
    reviews: [reviewSchema] // array of review
},{ timestamps : true });



module.exports = mongoose.model('Product', productSchema);