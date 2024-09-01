import { config as conf } from "dotenv"

conf();

const _config={
    port:process.env.PORT,
    mongo_url:process.env.MONGO_URL,
    env:process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET_KEY,
};



//to make the object read only
export const config=Object.freeze(_config);