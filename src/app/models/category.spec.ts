import { Category } from './category';

describe('Category', () => {
  it('should create an instance', () => {
    expect(new Category(null, null, null)).toBeTruthy();
  });
});
