import config from "./config";
import { initDb } from "./db";
import app from "./app";

async function main() {
  try {
    // initializing db connection
    await initDb();

    console.log("Database Connected Successfully");

    // server start listening
    app.listen(config.port, () => {
      console.log(`Server Running on port: ${config.port}`);
    });
  } catch (error) {
    console.log("Failed to start the server:", error);
  }
}

main();
