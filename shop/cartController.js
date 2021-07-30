const User = require("../entity/User.js");
const Product = require("../entity/Product.js");


exports.add = async(req, res, next) => {
    const authUser = await User.findByPk(req.session.user.id);
    const cart = authUser.cart ? authUser.cart : [];
    const product = await Product.findByPk(parseInt(req.body.id));
    if (cart.some(i => i.product.id === product.id)) {
        cart.find(e => e.product.id === product.id).count++;
    } else {
        cart.push({
            product,
            count: parseInt(req.body.count)
        })
    }
    authUser.cart = cart
    await authUser.save();
    res.json(authUser.cart);
}

exports.view = async(req, res) => {
    const product = await Product.findByPk(parseInt(req.body.id));
    res.json(product)
}