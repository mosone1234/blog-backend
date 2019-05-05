const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const db = require('./db');
// const swaggerDoc = require('./config/swaggerDocs');
// const endpoints = require('./config/endpoints');

db.sequelize.sync({ force: true}).then(() => {
    console.log('Drop and resync with { force: true }');
});

// Settings

app.set('port', process.env.PORT || 3000);

// midlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}))

// Routes.
app.use(require('./routes/user.routes'));

// app.use(require('./routes/auth.routes'));
// app.use('/api/users', require('./routes/users.routes'));
// app.use('/api/companies', require('./routes/company.routes'));
// app.use('/api/authorities', require('./routes/role.routes'));

// starting server

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});

// endpoints(app);
// swaggerDoc(app);