import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data || '[]');
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing file:', error);
      throw new Error('Could not write to file');
    }
  }

  async getProducts() {
    try {
      return await this._readFile();
    } catch (error) {
      throw new Error('Could not get products');
    }
  }

  async getProductById(id) {
    try {
      const products = await this._readFile();
      return products.find(p => String(p.id) === String(id));
    } catch (error) {
      throw new Error('Could not get product by ID');
    }
  }

  async addProduct(product) {
    try {
      // Basic validation example
      if (!product.title || !product.price || !product.code) {
        throw new Error('Missing required product fields');
      }
      const products = await this._readFile();
      const newProduct = {
        id: uuidv4(),
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        status: product.status ?? true,
        stock: product.stock,
        category: product.category,
        thumbnails: product.thumbnails || []
      };
      products.push(newProduct);
      await this._writeFile(products);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(id, updates) {
    try {
      const products = await this._readFile();
      const idx = products.findIndex(p => String(p.id) === String(id));
      if (idx === -1) return null;
      const { id: _, ...rest } = updates;
      products[idx] = { ...products[idx], ...rest };
      await this._writeFile(products);
      return products[idx];
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this._readFile();
      const idx = products.findIndex(p => String(p.id) === String(id));
      if (idx === -1) return null;
      const deleted = products.splice(idx, 1);
      await this._writeFile(products);
      return deleted[0];
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}