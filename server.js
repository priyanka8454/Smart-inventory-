require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/stock", require("./routes/stock.routes"));
app.use("/api/reports", require("./routes/report.routes"));
app.use("/api/logs", require("./routes/log.routes"));

app.listen(5000, () => console.log("Server running on 5000"));
