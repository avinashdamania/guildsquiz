import dotenv from "dotenv";
import express from "express";
import path  from "path";

// Configure environment based on .env file
const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;


let p = path.join(__dirname, '../public');
console.log(p);
app.use(express.static(p));
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
