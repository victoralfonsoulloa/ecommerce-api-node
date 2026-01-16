import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// GET all products
router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

// GET product by id
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (product) res.json(product);
  else res.status(404).json({ error: 'Product not found' });
});

// POST new product
router.post('/', async (req, res) => {
  const product = req.body;
  const created = await productManager.addProduct(product);
  res.status(201).json(created);
});

// PUT update product
router.put('/:pid', async (req, res) => {
  const updated = await productManager.updateProduct(req.params.pid, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Product not found' });
});

// DELETE product
router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(req.params.pid);
  if (deleted) res.json({ message: 'Product deleted' });
  else res.status(404).json({ error: 'Product not found' });
});

export default router;