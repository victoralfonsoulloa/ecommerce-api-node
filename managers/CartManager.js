import { promises as fs } from 'fs';
import ProductManager from './ProductManager.js';

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.productManager = new ProductManager('./data/products.json');
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this._readFile();
    const newId = carts.length ? (Number(carts[carts.length - 1].id) + 1) : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => String(c.id) === String(id));
  }

  async addProductToCart(cartId, productId) {
    const carts = await this._readFile();
    const cart = carts.find(c => String(c.id) === String(cartId));
    if (!cart) return null;

    // Check if product exists
    const product = await this.productManager.getProductById(productId);
    if (!product) return null;

    const prodInCart = cart.products.find(p => String(p.product) === String(productId));
    if (prodInCart) {
      prodInCart.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await this._writeFile(carts);
    return cart;
  }
}