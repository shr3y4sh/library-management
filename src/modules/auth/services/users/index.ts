import { userRegister } from './register.service.js';
import { userLogin } from './login.service.js';
import { getUserData } from './user-profile.service.js';

export default {
    userLogin,
    userRegister,
    userProfile: getUserData,
};
