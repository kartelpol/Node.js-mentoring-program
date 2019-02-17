import productControllers from './products';
import userControllers from './users';
import { authorizationController, refreshTokenController } from './authorizaion';

export default {
    refreshToken: refreshTokenController,
    authorization: authorizationController,
    products: productControllers,
    user: userControllers,
}