import jwt from 'jsonwebtoken';
import { AppleAuthProvider } from 'next-auth/providers';

const appleProvider = AppleAuthProvider({
  clientId: process.env.APPLE_CLIENT_ID,
  teamId: process.env.APPLE_TEAM_ID,
  privateKey: process.env.APPLE_PRIVATE_KEY,
  keyId: process.env.APPLE_KEY_ID,
  scope: 'name email',
  // Функція, яка приймає на вхід токен, видає додаткові дані користувача
  profile: (token) => {
    const decoded = jwt.decode(token.id_token, { complete: true });
    if (!decoded) {
      throw new Error('Failed to decode ID token from Apple');
    }

    const { email, sub } = decoded.payload;
    const name = decoded.payload?.name?.firstName + ' ' + decoded.payload?.name?.lastName;
   
    return {
      id: sub,
      name: name,
      email: email,
    };
  },
});

export default appleProvider;