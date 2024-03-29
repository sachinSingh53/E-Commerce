// product.test.js
const request = require('supertest');
const Product = require('../../models/product');
const app = require('../../app'); 

describe('Product API Tests', () => {
  // Mock data for testing
  const mockProduct = {
      _id: '65bd04f419d200a2d56552fb',
      name: 'lava',
      description: 'smart phone',
  };

  jest.mock('../../models/product', () => ({
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
  }));




  it('should get a single product by ID', async () => {
    // Mock the findById method to return a predefined product
    Product.findById(mockProduct);

    const response = await request(app).get(`/products/${mockProduct._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toEqual(expect.objectContaining({
      _id: mockProduct._id,
      name: mockProduct.name,
      description: mockProduct.description,
      
    }));
  });

  it('should return a 404 status for a non-existing product', async () => {
    // Mock the findById method to return null (no product found)
    Product.findById(null);

    const response = await request(app).get('/products/65bcbf41306d5cb45b7069ee');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'product not found');
  });  
});
