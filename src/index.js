const app = require("./app");

const PORT = 8000;
let server;
server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedHandler);
process.on("unhandledRejection", unexpectedHandler);
