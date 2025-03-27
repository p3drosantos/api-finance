var validator = require("validator");

export const checkIfAmountIsValid = (amount: number) => {
  if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
    return false;
  }

  return validator.isDecimal(amount.toFixed(2), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: ".",
    decimal_digits: "2",
    force_decimal: true,
  });
};
