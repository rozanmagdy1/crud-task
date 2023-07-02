const Product = require('../Models/productModel');
const client = require('../redisClient');

class ProductService {
    async getAllProducts() {
        try {
            return await Product.find({});
        } catch (err) {
            console.error('Error getting product:', err);
            return 'Error happen';
        }
    }
    
    async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return null;
            };
            client.set(`product:${id}`, JSON.stringify(product));
            return product;
        } catch (err) {
            console.error('Error getting product:', err);
            return 'Error happen';
        }
}

    async addProduct(data) {
    try {
        const product = new Product(data);
        await product.save();
        return product;
    } catch (err) {
        console.error('Error creating product:', err);
        return 'Error happen';
    }
}

    async updateProductById(id, data) {
    try {
        const product = await Product.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return null;
        }
        return product;
    } catch (err) {
        console.error('Error updating product:', err);
        return 'Error happen';
    }
}

    async deleteProductById(id) {
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return null;
        }
        return product;
    } catch (err) {
        console.error('Error deleting product:', err);
        return 'Error happen';
    }
}



}
module.exports = {
    ProductService
}