import { isValidUrl } from './validate';

describe('isValidUrl()', () => {
  // Test: this function is the callback to run the real test
  test('A valid url should return 1', () => {
    const input = 'https://google.com';

    expect(isValidUrl(input)).toBe(true || 1);
  });
});
