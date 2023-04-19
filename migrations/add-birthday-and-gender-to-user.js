import migrateMongoose from 'migrate-mongoose';
import User from '@/models/User';

const { MONGODB_URL } = process.env;

const migrate = migrateMongoose({
  modelName: 'User',
  dbUrl: MONGODB_URL,
  schema: User.schema,
  esModule: true,
});

export default migrate('add-birthday-and-gender-to-user', async () => {
  await User.updateMany(
    {},
    {
      $set: {
        birthday: '',
        gender: 'Чоловік',
      },
    },
  );
});
