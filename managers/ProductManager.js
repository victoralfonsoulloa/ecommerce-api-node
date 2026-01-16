import { promises as fs } from 'fs';

export default class ProductManager {
  constructor(path) {
    this.path = path;
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

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find(p => String(p.id) === String(id));
  }

  async addProduct(product) {
    const products = await this._readFile();
    const newId = products.length ? (Number(products[products.length - 1].id) + 1) : 1;
    const newProduct = {
      id: newId,
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
  }

  async updateProduct(id, updates) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const { id: _, ...rest } = updates; // Prevent id update
    products[idx] = { ...products[idx], ...rest };
    await this._writeFile(products);
    return products[idx];
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const deleted = products.splice(idx, 1);
    await this._writeFile(products);
    return deleted[0];
  }
}