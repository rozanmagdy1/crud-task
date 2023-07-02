const { validationResult } = require('express-validator');
let { ProductService } = require("../Services/productService");
let service = new ProductService();

class ProductController {
    async getAllProducts(req, res) {
        let products = await service.getAllProducts();
        if (products === 'Error happen') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(products);
        }
    }
    async getProductById(req, res) {
        let id = req.params.id;
        let product = await service.getProductById(id);
        if (product === null) {          
            res.status(404).json({ message: `No product with that id:${id} found!`});
        } else if (product === 'Error happen') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ product })
        }
    }
    async addProduct(req, res) {
        let data = req.body;
        const errors = validationResult(req);
        if(errors.array().length === 0){
            let product = await service.addProduct(data);

            if (product === 'Error happen') {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ Message: "The product created successfully" });
            }
        }else{
            res.status(422).json({ Message: "Validation faild", Reason: errors.array()});
        }
    }
    async updateProductById(req, res) {
        let id = req.params.id;
        let data = req.body;
        const errors = validationResult(req);
        if(errors.array().length === 0){
            let product = await service.updateProductById(id, data);
            if (product === null) {
                res.status(404).json({ message: `No product with that id:${id} found!` })
            } else if (product === 'Error happen') {
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json(product);
            }
        }else{
            res.status(422).json({ Message: "Validation faild", Reason: errors.array()});
        }
    }

    async deleteProductById(req, res) {
        let id = req.params.id;
        let product = await service.deleteProductById(id);
        if (product === null) {
            res.status(404).json({ message: `No product with that id:${id} found!` })
        } else if (product === 'Error happen') {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ Message: "The product deleted successfully" })
        }
    }

}
module.exports = {
    ProductController
}