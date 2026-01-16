import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
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
    } catch (error) {
      console.error('Error reading cart file:', error);
      return [];
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing cart file:', error);
      throw new Error('Could not write to cart file');
    }
  }

  async createCart() {
    try {
      const carts = await this._readFile();
      const newCart = { id: uuidv4(), products: [] };
      carts.push(newCart);
      await this._writeFile(carts);
      return newCart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this._readFile();
      return carts.find(c => String(c.id) === String(id));
    } catch (error) {
      console.error('Error getting cart by ID:', error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
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
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  }
}