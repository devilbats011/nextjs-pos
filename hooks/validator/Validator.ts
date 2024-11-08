export type valueType<T> = T | undefined;
export interface validateMessagesI {
  key?: string;
  message: string;
  isValid: boolean;
}

export default class Validator<T> {
  public value: valueType<T>;
  public rules: validateMessagesI[] = [];

  constructor() {}

  input(value: valueType<T>) {
    this.value = value;
    return this;
  }

  private ruleManager(
    failedRule: boolean,
    failMessage: validateMessagesI
  ): void {
    let validateMessages = { message: "", isValid: true };
    if (failedRule) {
      validateMessages = failMessage;
    }
    this.rules.push(validateMessages);
  }

  required() {
    const unu =
      this.value == null || this.value == undefined || this.value == ""
        ? true
        : false;
    this.ruleManager(unu, { message: "value required.", isValid: false });
    return this;
  }

  email() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = this.value;
    this.ruleManager(
      typeof value !== "string" ||
        (typeof value === "string" && !emailRegex.test(value)),
      {
        message: "Invalid email @ address.",
        isValid: false,
      }
    );
    return this;
  }

  /**
   * Note: Required setConfirmPassword and setConfirmPassword1 and setConfirmPassword2 values , before using this method
   */
  confirmPassword() {
    const password_register_1 = sessionStorage.getItem("password_register");
    const password_register_2 = sessionStorage.getItem(
      "password_confirmed_register"
    );
    this.ruleManager(password_register_1 !== password_register_2, {
      message: "Mismatch password.",
      isValid: false,
    });
    return this;
  }

  setConfirmPassword1(value: string) {
    sessionStorage.setItem("password_register", value);
    return this;
  }

  setConfirmPassword2(value: string) {
    sessionStorage.setItem("password_confirmed_register", value);
    return this;
  }

  number() {
    this.ruleManager(isNaN(this.value as number), {
      message: "Invalid number.",
      isValid: false,
    });
    return this;
  }

  validateGetErrors(): validateMessagesI[] {
    const _rules = this.rules.filter((rule) => !rule.isValid);
    this.rules = [];
    this.value = undefined;
    return _rules;
  }
}
