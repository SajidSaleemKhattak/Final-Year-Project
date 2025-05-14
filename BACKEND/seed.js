const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const users = [
  {
    name: "Ali Raza",
    email: "ali.raza@example.com",
    password: "$2a$10$wJjd5J3Gcj7w8EfW3JVmM.X0Z1YdT8mQHl0jR0a5G2WxDbhr3Y9Dq", // client123
    role: "client",
  },
  {
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    password: "$2a$10$4jNHr87lEAKnLRe2NU2/ieEKo8DdhPLNcV2M7Q/u1UKFknr4PPtkW", // client123
    role: "client",
  },
  {
    name: "Adeel Hussain",
    email: "adeel.hussain@lawfirm.com",
    password: "$2a$10$CzYf0yzE7oz6eL3F5E56VOGYP.AKfS/FWkOex2RL/FK1HbIgOm4ZC", // lawyer123
    role: "lawyer",
  },
  {
    name: "Sara Naveed",
    email: "sara.naveed@legalhub.org",
    password: "$2a$10$XKfAxp7gUqW9xQmjGmC1H.6fR/SGrrToEMZ6TxiyFh81OpvQ6A8Qe", // lawyer123
    role: "lawyer",
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
