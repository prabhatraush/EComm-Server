const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: '30d',
        }
    );
};

const isAuth = (req, res, next) => {
    const auth = req.header.authorization;
    if (auth) {
        const token = auth.slice(7, auth.length); // Bearer TOKEN

        // jwt.verify(token, secretOrPublicKey, [options, callback])
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({
                    message: 'Invalid token'
                });
            } else {
                req.user = decode;
                next();
            }
        });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).send({
            message: 'Invalid Admin Token'
        });
    }
};

const isSeller = (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
        next();
    } else {
        res.status(401).send({
            message: 'Invalid Seller Token'
        });
    }
};

const isAdminOrSeller = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'seller')) {
        next();
    } else {
        res.status(401).send({
            message: 'Invalid Admin/Seller Token'
        });
    }
};


module.exports = {
    isAuth,
    isAdmin,
    isSeller,
    isAdminOrSeller
};