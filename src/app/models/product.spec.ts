import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(null,null, null,null,)).toBeTruthy();
  });
});
