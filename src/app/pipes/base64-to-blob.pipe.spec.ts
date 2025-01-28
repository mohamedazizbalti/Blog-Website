import { Base64ToBlobPipe } from './base64-to-blob.pipe';

describe('Base64ToBlobPipe', () => {
  it('create an instance', () => {
    const pipe = new Base64ToBlobPipe();
    expect(pipe).toBeTruthy();
  });
});
