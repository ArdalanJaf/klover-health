// turns number (4000) to price (40.00)

export const numToPrice = (number) => {
  let arr = Array.from(String(number), Number);
  arr.splice(number.toString().length - 2, 0, ".");
  return arr.join("");
};
