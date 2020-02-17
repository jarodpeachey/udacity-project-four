import { getData, postData } from './api';

test("It should return true", async () => {
  expect(getData).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof getData).toBe("function");
});

test("It should return true", async () => {
  expect(postData).toBeDefined();
});

test("It should be a function", async () => {
  expect(typeof postData).toBe("function");
});
