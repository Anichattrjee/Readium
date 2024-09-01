import { config as conf } from "dotenv"

conf();

const _config={
    port:process.env.PORT,
    mongo_url:process.env.MONGO_URL,
    env:process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET_KEY,
    cloudinaryCloudName:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET
};



//to make the object read only
export const config=Object.freeze(_config);