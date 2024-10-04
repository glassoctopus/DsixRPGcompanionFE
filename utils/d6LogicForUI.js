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
  let [whole, decimal] = String(currentValue).split('.');
  Number(whole);
  Number(decimal);
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

const assignPointsForDieCode = (dieCode) => {
  let points = 0;
  let die = 0;
  const [whole, decimal] = String(dieCode).split('.');

  if (decimal === '0') {
    points += 0;
  } else if (decimal === '1') {
    points += 1;
  } else if (decimal === '2') {
    points += 2;
  }

  die = Number(whole) * 3;
  points += die;
  return points;
};

export {
  formatDiceCode, addOrSubtractPips, clampPip, assignPointsForDieCode,
};
