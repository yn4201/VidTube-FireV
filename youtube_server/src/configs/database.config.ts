require('dotenv').config();
export default () => ({
    appDatabase: process.env.APP_DATABASE,
});