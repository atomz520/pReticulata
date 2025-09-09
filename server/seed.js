require('dotenv').config();

const mongoose = require('mongoose');
const Info = require('./models/Info');
const FryBatch = require('./models/FryBatch');

const mongoURI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/pReticulata';

async function seed() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB, clearing collections...');
    await Info.deleteMany({});
    await FryBatch.deleteMany({});

    console.log('Inserting sample Info documents...');
    const infoDocs = await Info.insertMany([
      {
        batch: 'Domestic-Alpha',
        type: 'Blonde',
        born: '2025-07-01',
        died: '',
        remarks: 'Initial domestic batch',
        photo: null,
      },
      {
        batch: 'Store-Beta',
        type: 'Cobra',
        born: '2025-06-15',
        died: '',
        remarks: 'Purchased from local store',
        photo: null,
      },
    ]);

    console.log(`Inserted ${infoDocs.length} Info docs.`);

    console.log('Inserting sample FryBatch documents...');
    const fryDocs = await FryBatch.insertMany([
      {
        parent_m: 'M-RedDragon',
        parent_f: 'F-Sunshine',
        date_dropped: '2025-06-30',
        number_d: 60,
        number_1m: 6,
        number_2m: 12,
        number_m: 22,
        number_f: 28,
      },
      {
        parent_m: 'M-BlueSteel',
        parent_f: 'F-Goldie',
        date_dropped: '2025-07-10',
        number_d: 45,
        number_1m: 5,
        number_2m: 9,
        number_m: 15,
        number_f: 21,
      },
    ]);

    console.log(`Inserted ${fryDocs.length} FryBatch docs.`);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();

