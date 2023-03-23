import jwt from "jsonwebtoken";

const createActivationToken = async (user) => {
  const result = await jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.ACTIVATION_TOKEN_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return result;
};
const createResetToken = async (payload) => {
  const result = await jwt.sign(
    payload,
    process.env.RESET_TOKEN_SECRET,
    {
      expiresIn: "6h",
    }
  );
  return result;
};
const createToken = async (user) => {
  const result = await jwt.sign(
    { userId: user.userId, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return result;
};

const tokenService = { createActivationToken, createResetToken, createToken };
export default tokenService;
