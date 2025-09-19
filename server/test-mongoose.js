const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Mongoose connected!");
  } catch (err) {
    console.error("❌ Connection error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
