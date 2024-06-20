export const REGEX_HOST_PASSWORD = {
  pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).{8,}$/,
  message: "不少于8个字符，至少包含数字、字母、特殊字符三种类型",
}
