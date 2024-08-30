import app from "./src/app";
import { config } from "./src/config/config";
import conncetDB from "./src/config/db";


const startServer=async ()=>{

    await conncetDB();

    
    const port=config.port;

    app.listen(port,()=>{
        console.log(`Server is running on port: ${port}`);
    })
};

startServer();