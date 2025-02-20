// Sinh danh sách số từ 0-10
const generateNumbers = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `num-${i}`,
    value: i.toString().padStart(1, "0"),
  }));
};

// Sinh danh sách số từ 00-99
const generateNumbers2 = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `group-num-${i}`,
    value: i.toString().padStart(2, "0"),
  }));
};

// Hàm tạo số theo nhóm (000-099, 100-199, ...)
const generateNumbers3 = (group) => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `group-${group}-num-${i}`,
    value: (group * 100 + i).toString().padStart(3, "0"),
  }));
};

export { generateNumbers, generateNumbers2, generateNumbers3 };
