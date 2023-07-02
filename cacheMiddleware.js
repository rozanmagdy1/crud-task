const client = require('./redisClient');

function cacheMiddleware(req, res, next) {
    const productId = req.params.id;

    client.get(`product:${productId}`, (error, cachedProduct) => {
        if (error) {
            console.error('Error retrieving cached product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (cachedProduct) {
            console.log('Product data retrieved from cache');
            return res.json(JSON.parse(cachedProduct));
        }

        next();
    });
}

module.exports = cacheMiddleware;