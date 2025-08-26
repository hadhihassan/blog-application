import { Rule } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

// Name validation
export const nameRules: Rule[] = [
  { required: true, message: "Please input your name!" },
  { min: 2, message: "Name must be at least 2 characters" },
  { max: 50, message: "Name cannot exceed 50 characters" },
];

// Email validation
export const emailRules: Rule[] = [
  { required: true, message: "Please input your email!" },
  { type: "email", message: "Please enter a valid email!" },
];

// Password validation
export const passwordRules: Rule[] = [
  { required: true, message: "Please input your password!" },
  { min: 6, message: "Password must be at least 6 characters" },
  {
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
    message: "Password must contain at least one letter and one number",
  },
];

// Confirm password validation (depends on password field)
export const confirmPasswordRules = ({ getFieldValue }: {
  getFieldValue: (name: string) => StoreValue;
}): Rule[] => [
    { required: true, message: "Please confirm your password!" },
    {
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error("Passwords do not match!"));
      },
    },
  ];
