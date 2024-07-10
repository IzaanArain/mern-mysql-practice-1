const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/post",require("./routes/postRoutes"));

app.use((err,req,res,next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.stack);
    res.status(500).json({msg:"Something went rely wrong."})
});

app.get("/", (req, res) => {
  return res.send("<h1>Server is running</h1>");
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
