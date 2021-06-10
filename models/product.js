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
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        default: function () {
            return `${slugify(this.name)}-${shortid()}`;
        }
    },
    image: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    brand: {
        type: String,
        required: true
    }, // Brand/Company Name
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }, // Overall rating
    reviews: [reviewSchema] // array of review
});

module.exports = mongoose.model('Product', productSchema);