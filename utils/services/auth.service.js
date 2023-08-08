import { activateEmailTemplate } from "../../emails/activateEmailTemplate";
import bcrypt from "bcryptjs";

import emailService from "./email.service";
import tokenService from "./token.service";
import userService from "./user.service";

const registerUser = async (email, password) => {
  // check if user already exist
  const oldUser = await userService.findEmail(email);
  if (oldUser) {
    throw new Error(
      `Такий ${email} вже зареєстровано! Будь ласка залогіньтесь!`,
    );
  }
  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);
  const uniqueString = emailService.createUniqueString();
  // Create user in our database
  const user = await userService.createUser(
    email,
    encryptedPassword,
    uniqueString,
  );
  await emailService.sendEmail(
    email,
    uniqueString,
    "Активуйте вашу електронну адресу",
    activateEmailTemplate,
  );
  return user;
};

const login = async (email, password) => {
  const user = await userService.findEmail(email);
  console.log("login");
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = await tokenService.createToken({
      userId: user._id,
      email,
    });
    return token;
  } else {
    throw new Error(`Користувач ${email} не існує або пароль вказано не вірно`);
  }
};

const authService = { registerUser, login };
export default authService;
