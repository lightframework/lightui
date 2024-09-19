export const REGEX_HOST_PASSWORD = {
  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
  message: "不少于8个字符，至少包含数字、字母、特殊字符三种类型",
}
