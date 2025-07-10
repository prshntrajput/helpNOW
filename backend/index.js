const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const logger = require("./logger/pino");

dotenv.config();


const server = http.createServer(app);
const io = new Server( server ,
    {
        cors:{
            origin:"*"
        },
    },
);

io.on("connection", (socket)=>{
    logger.info(`Socket Connected : ${socket.id}`);
})

connectDB();

server.listen(process.env.PORT, ()=>{
    logger.info(`Server runnig on ${process.env.PORT}`)
});




