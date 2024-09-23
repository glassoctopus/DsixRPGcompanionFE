// dice display
const formatDiceCode = (code) => {
  if (code === undefined) { return; }
  const [whole, decimal] = code.toString().split('.');
  // eslint-disable-next-line consistent-return
  if (!decimal) return `${whole}D`;
  // eslint-disable-next-line consistent-return
  return `${whole}D+${decimal}`;
};

const addOrSubtractPips = (currentValue, operator) => {
  let [whole, decimal] = String(currentValue).split('.').map(Number);

  if (decimal === undefined) { decimal = 0; }

  if (operator === '+') {
    if (decimal >= 2) {
      whole += 1;
      decimal = 0;
    } else if (decimal === 0) {
      decimal = 1;
    } else {
      decimal += 1;
    }
  } else if (operator === '-') {
    if (decimal < 1) {
      whole -= 1;
      decimal = 2;
    } else {
      decimal -= 1;
    }
  }
  const wut = Number(`${whole}.${decimal}`);
  return wut;
};

const clampPip = (currentValue) => {
  console.log(currentValue);
  let [whole, decimal] = String(currentValue).split('.');
  Number(whole);
  console.log('first part of a die code: ', whole);
  Number(decimal);
  console.log('second part of a die code: ', decimal);
  if (decimal > 2) {
    decimal = 2;
    whole += 1;
  } else if (!undefined && decimal <= 0) {
    if (whole > 0) {
      whole -= 1;
    }
    decimal = 2;
  }
  return parseFloat(`${whole}.${decimal}`);
};

export { formatDiceCode, addOrSubtractPips, clampPip };
