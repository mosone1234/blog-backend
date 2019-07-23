const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const db = require('./db');
const data = require('./complements/liquidBase/changeLog')

// const swaggerDoc = require('./config/swaggerDocs');
// const endpoints = require('./config/endpoints');

// db.sequelize.sync({ force: true}).then(() => {
//     console.log('Drop and resync with { force: true }');
//     data.initialDataUser();
//     data.initialDataArticule();
// });


// Settings

app.set('port', process.env.PORT || 3200);

// midlewares

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }))

// Routes.
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/article.routes'));
app.use(require('./routes/image.routes'));

// starting server

app.listen(app.get('port'), () => {
    console.log('Server on port 3200');
});

// endpoints(app);
// swaggerDoc(app);