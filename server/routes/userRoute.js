const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {
    generateToken,
    isAuth,
    isAdmin,
    isAdminOrSeller
} = require('../middlewares/utils');

const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const password = req.body.password;
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        res.status(401).send({
            message: 'Invalid email or password'
        });
        return;
    }

    if (!bcrypt.compare(password, user.password)) {
        res.status(401).send({
            message: 'Incorrect credentials'
        });
        return;
    }

    const token = await generateToken(user);
    const {
        _id,
        name,
        email,
        mobile,
        role
    } = user;

    res.status(200).send({
        user: {
            _id,
            name,
            email,
            mobile,
            role
        },
        token
    });
});

userRouter.post('/register', async (req, res) => {
    const data = req.body;

    const user = await User.findOne({
        email: data.email
    });
    if (user) {
        res.status(401).send({
            message: 'User already exist! \n Login to continue'
        });
        return;
    }
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: await bcrypt.hash(data.password, 8),
        mobile: data.mobile
    })
    const registerUser = await newUser.save();
    const {
        _id,
        name,
        email,
        mobile,
        role
    } = registerUser;

    if (newUser) {
        res.status(200).send({
            user: {
                _id,
                name,
                email,
                mobile,
                role
            },
            token: generateToken(registerUser)
        })
    }

});

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400).send({
            message: 'User Not Exist'
        });
        return;
    }
    res.status(200).send(user);
});

// this route can be acessed by Admin Only
userRouter.get('/', isAuth, isAdmin, async (req, res) => {
    const users = await User.find({});
    if (!users) {
        res.status(400).send({
            message: 'No Users are available'
        });
        return;
    }
    res.status(200).send(users);
});

userRouter.put('/:id', isAuth, isAdmin, async(req, res) => {
    
});

userRouter.delete('/:id', isAuth, isAdmin, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(400).send({
            message: 'User Not Exist'
        });
        return;
    }
    if (user.role === 'admin') {
        res.status(400).send({
            message: 'Can Not Delete Admin User'
        });
        return;
    }
    const deleteUser = await user.remove();
    res.status(200).send({
        message: 'User Deleted',
        user: deleteUser
    });
});

module.exports = userRouter;