import mongoose from 'mongoose';
import app from './app';

const port = 5000; 
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/digital-cow-hut');
    // await mongoose.connect(config.database_url as string);

    console.log('Database connected successfully');

    app.listen(port, () => {
      console.log(`University management server running port:  ${port}`);
    });
  } catch (err) {
    console.log('Failed to connect database ', err);
  }
}
main();

