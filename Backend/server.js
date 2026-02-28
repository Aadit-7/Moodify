require("dotenv").config();

const app = require("./src/app");
const connecteToDB = require("./src/config/database");

const port = process.env.PORT;

connecteToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
