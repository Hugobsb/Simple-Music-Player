const {
    NODE_ENV = 'development',
    SESS_DURATION = 31536000000
} = process.env;
const IN_PROD = NODE_ENV === 'production';

module.exports = {
    sameSite: true,
    secure: IN_PROD,
    maxAge: SESS_DURATION
};