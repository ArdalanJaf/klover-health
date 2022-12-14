export function priceToNum(input) {
  // turns user input into SQL friendly value. eg. 300.50 => 30050
  if (!input.toString().includes(".")) return input * 100;
  let noDot = input.toString().split("");
  let wDot = noDot.slice(noDot.indexOf("."), noDot.length);
  noDot = noDot.splice(0, noDot.indexOf("."));
  wDot.shift();
  wDot = wDot.splice(0, 2);
  for (let i = 0; i < 2; i++) if (!wDot[i]) wDot.push("0");
  return Number(noDot.join("") + wDot.join(""));
}
