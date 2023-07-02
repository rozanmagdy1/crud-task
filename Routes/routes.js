const { body } = require('express-validator');
const cacheMiddleware = require('../Middlewares/cacheMiddleware');
let { ProductController } = require("../Controllers/productController");
let product_controller = new ProductController();

function routes(app) {

    app.get("/products", product_controller.getAllProducts);
    app.get("/products/:id", cacheMiddleware,product_controller.getProductById);

    app.post('/products', [
        body('name').notEmpty().isString().withMessage('Name must be a non-empty string'),
        body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
        body('description').notEmpty().isString().withMessage('Description must be a non-empty string'),
    ], product_controller.addProduct);

    app.put("/products/:id", [
        body('name').notEmpty().isString().withMessage('Name must be a non-empty string'),
        body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
        body('description').notEmpty().isString().withMessage('Description must be a non-empty string'),
    ], product_controller.updateProductById);

    app.delete("/products/:id", product_controller.deleteProductById);
}
module.exports = {
    routes
}