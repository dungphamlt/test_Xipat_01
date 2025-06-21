// Lấy dữ liệu từ localStorage
export const loadFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Lưu dữ liệu vào localStorage
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
