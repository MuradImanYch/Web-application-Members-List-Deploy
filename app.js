const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const userDataRoutes = require('./routes/user-data');
const getUserDataRoutes = require('./routes/get-user-data');
const setRoleRoutes = require('./routes/setRole');
const forgotPswRoutes = require('./routes/forgot-psw');
const getDepartmentsRoutes = require('./routes/get-departments');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use('https://web-application-members-list-deploy.vercel.app/auth', authRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/search', searchRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/user-data', userDataRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/get-user-data', getUserDataRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/set-role', setRoleRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/forgot-psw', forgotPswRoutes);
app.use('https://web-application-members-list-deploy.vercel.app/departments', getDepartmentsRoutes);

const storage = multer.diskStorage({ // multer handler
    destination: (req, file, cb) => {
        cb(null, './public/static/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});
app.use('/public/static/uploads', express.static('./public/static/uploads'));

app.post('/upload', upload.single('image'), (req, res) => { // uploads handle
    res.send({
        url: `/public/static/uploads/${req.file.originalname}`
    });
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, (err) => {
    if(err) return err;
    console.log(`Server on ${PORT} is running...`);
});