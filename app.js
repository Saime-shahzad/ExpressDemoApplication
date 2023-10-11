const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const appRouter = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", appRouter)
// app.get("randomuser.me/api/", function (req, res, next) {
//     res.send("Success");
//   });


const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
