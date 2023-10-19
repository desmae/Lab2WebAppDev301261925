const Product = require('./product');

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// product by ID
const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

// create new product
const createProduct = async (req, res) => {
    const { name, description, price, quantity, category } = req.body;
    const newProduct = new Product({ name, description, price, quantity, category });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error creating product' });
    }
};

// update product by id
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, quantity, category } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, quantity, category }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: 'Error updating product' });
    }
};

// delete product by id
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await Product.findByIdAndRemove(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};

// delete all products
const deleteAllProducts = async (req, res) => {
    try {
        const deletedProducts = await Product.deleteMany({});
        res.json(deletedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting products' });
    }
};

// find products by name kw
const findProductsByName = async (req, res) => {
    const kw = req.query.name;
    try {
        const products = await Product.find({ name: { $regex: kw } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error searching for products' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    findProductsByName,
};