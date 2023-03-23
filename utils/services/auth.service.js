import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
import bcrypt from "bcryptjs";

import emailService from "./email.service";
import tokenService from "./token.service";
import userService from "./user.service";

const registerUser = async (firstName, lastName, phoneNumber, email, password) => {
  // check if user already exist
  const oldUser = await userService.findEmail(email);
  if (oldUser) {
    throw new Error(`User ${email} already exists`);
  }
  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(password, 10);
  const uniqueString = await emailService.createUniqueString();
  // Create user in our database
  const user = await userService.createUser(
    firstName,
    lastName,
    phoneNumber,
    email,
    encryptedPassword,
    uniqueString
  );

  await emailService.sendEmail(email, uniqueString, "Активуйте вашу електронну адресу", activateEmailTemplate);
  return user;
};

const login = async (email, password) => {
  const user = await userService.findEmail(email);
console.log("33", user);
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("35" );
    const token = await tokenService.createToken({
      userId: user._id,
      email,
    });
    console.log("40",token );
    return token;
  } else {
    throw new Error(`Користувач ${email} не існує або пароль вказано не вірно`);
  }
};

const authService = { registerUser, login };
export default authService;
