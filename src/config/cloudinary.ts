import { v2 as cloudinary} from "cloudinary";


cloudinary.config({
  cloud_name: 'dlinyid4r',
  api_key: '279518198325848',
  api_secret: 'YOUR_API_SECRET',
  secure: true,
});

export default cloudinary; 