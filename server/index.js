import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';

import authRouts from './routes/auth.js';
import userRouts from './routes/users.js';
import { register } from './controllers/auth.js';
import postRouts from './routes/posts.js';
import { verifyToken } from './middleware/auth.js';
import { createPost } from './controllers/posts.js';
/*test*/
// import User from './models/User.js';
// import Post from './models/Post.js';
// import {users,posts} from './data/index.js';
/* Configs */

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy(
    { policy: 'cross-origin' }
));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
//routes w files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken,upload.single("picture"),createPost);

/*routes*/
app.use("/auth",authRouts);
app.use("/users",userRouts);
app.use("/posts",postRouts);
//mongoose

const PORT = process.env.PORT || 3001;
console.log(process.env.MONGO_URL)
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));


        // insert dummy data to test
        // User.insertMany(users);
        // Post.insertMany(posts);
}).catch((error) => console.log(error.message));
