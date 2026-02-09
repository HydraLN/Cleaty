import express from 'express';
import path from 'path';
import router from './routes/router.js'
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const data = path.join(__dirname, 'data', 'users.json')
//const users = fs.readFile(data)


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', router)

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(8001)