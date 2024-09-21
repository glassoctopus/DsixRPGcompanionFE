// dice display
const formatDiceCode = (code) => {
  const [whole, decimal] = code.toString().split('.');
  if (!decimal) return `${whole}D`;
  return `${whole}D+${decimal}`;
};

const addOrSubtractPips = (currentValue, operator) => {
  let [whole, decimal] = currentValue.split('.');
  if (operator === '+') {
    if (decimal >= 2) {
      whole += 1;
    } else {
      decimal += 1;
    }
  } else if (operator === '-') {
    if (decimal < 1) {
      whole -= 1;
    } else {
      decimal -= 1;
    }
  }
  return whole.decimal;
};

const clampPip = (currentValue) => {
  let [whole, decimal] = currentValue.split('.');
  if (decimal > 2) {
    decimal = 2;
    whole += 1;
  } else if (decimal <= 0) {
    if (whole > 0) {
      whole -= 1;
    }
    decimal = 2;
  }
  return parseFloat(`${whole}.${decimal}`);
};

export { formatDiceCode, addOrSubtractPips, clampPip };
