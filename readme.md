# ecommerce-api-node

A simple and modern RESTful API for managing products and shopping carts, built with Node.js and Express.  
Data is persisted using the local filesystem in JSON files.

## Features

- **Products:**  
  - List all products  
  - Get a product by ID  
  - Add a new product  
  - Update a product  
  - Delete a product  

- **Carts:**  
  - Create a new cart  
  - Get cart contents by ID  
  - Add a product to a cart  

## Project Structure

```
ecommerce-api-node/
├── data/
│   ├── products.json
│   └── carts.json
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/
│   ├── products.router.js
│   └── carts.router.js
├── server.js
└── package.json
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/victoralfonsoulloa/ecommerce-api-node.git
   cd ecommerce-api-node
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:8080](http://localhost:8080).

## API Endpoints

### Products

- `GET /api/products` — List all products
- `GET /api/products/:pid` — Get product by ID
- `POST /api/products` — Add a new product  
  **Body:**  
  ```json
  {
    "title": "string",
    "description": "string",
    "code": "string",
    "price": number,
    "status": boolean,
    "stock": number,
    "category": "string",
    "thumbnails": ["string"]
  }
  ```
- `PUT /api/products/:pid` — Update a product (except `id`)
- `DELETE /api/products/:pid` — Delete a product

### Carts

- `POST /api/carts` — Create a new cart
- `GET /api/carts/:cid` — Get cart by ID
- `POST /api/carts/:cid/product/:pid` — Add product to cart

## Notes

- All data is stored in `data/products.json` and `data/carts.json`.
- Use [Postman](https://www.postman.com/) or similar tools to test the API.

## License

MIT
