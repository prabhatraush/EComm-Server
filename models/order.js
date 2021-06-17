const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    orderItems: [ // user can add more than one Item in their cart
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        street1: {
            type: String,
            required: true
        },
        street2: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        lat: Number,
        lng: Number,
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "cancelled", "refund"],
        required: true,
    },
    paymentType: {
        type: String,
        enum: ["cod", "card"],
        required: true,
    },
    status: {
        type: String,
        enum: ["ordered", "packed", "shipped", "delivered"],
        default: "ordered",
    },
    deliveredAt: {
        type: Date
    },
},{ timestamps : true });


module.exports = mongoose.model('Order', OrderSchema);