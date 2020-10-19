const {
    SESS_NAME = 'sid',
    SESS_SECRET = 'ssh!\'itsasecret!'
} = process.env;

module.exports = {
    name: SESS_NAME,
    resave: true,
    saveUninitialized: true,
    unset: 'destroy',
    secret: SESS_SECRET,
};