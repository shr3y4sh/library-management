import 'dotenv/config';

export default {
    jwtAccessKey: process.env.ACC_TOKEN_KEY,
    jwtRefreshKey: process.env.REF_TOKEN_KEY,
};
