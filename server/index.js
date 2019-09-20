//Main starting point
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";
import cors from "cors";
// DB setup;
mongoose.connect("mongodb://localhost/auth");

const app = new express();
//App setup
app.use(morgan("combined"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json()); //{ type: "*.*" }
router(app);
//server setup

const port = process.env.PORT || 3090;

const server = http.createServer(app);
server.listen(port);
console.log("Server started on port ", port);
