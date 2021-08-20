function randomString(count) {
  const length = count;
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let index = length; index > 0; --index) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

export default randomString;
