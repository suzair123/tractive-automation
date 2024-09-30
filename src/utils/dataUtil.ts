export function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `test${timestamp}@example.com`;
  }
  