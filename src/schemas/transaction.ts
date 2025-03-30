import { z } from "zod";
var validator = require("validator");

export const createTransactionSchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required.",
    })
    .uuid({
      message: "User ID must be a valid UUID.",
    }),
  name: z
    .string({
      required_error: "Name is required.",
    })
    .trim()
    .min(1, {
      message: "Name is required.",
    }),
  date: z
    .string({
      required_error: "Date is required.",
      invalid_type_error: "Date must be a string.",
    })
    .datetime({
      message: "Date must be a valid date.",
    })
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime()) && parsedDate <= new Date();
      },
      {
        message: "Date must be in the past or present.",
      },
    ),
  type: z
    .string()
    .transform((val) => val.toUpperCase()) // Converte para maiúsculas
    .refine((val) => ["EXPENSE", "EARNING", "INVESTMENT"].includes(val), {
      message: "Type must be EXPENSE, EARNING or INVESTMENT.",
    }),
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .min(1, {
      message: "Amount must be greater than 0.",
    })
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      }),
    ),
});
