import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

// POST create new cart
router.post('/', async (req, res) => {
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

// GET cart by id
router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  if (cart) res.json(cart);
  else res.status(404).json({ error: 'Cart not found' });
});

// POST add product to cart
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (updatedCart) res.json(updatedCart);
  else res.status(404).json({ error: 'Cart or product not found' });
});

export default router;