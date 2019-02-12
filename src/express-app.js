import * as express from 'express';
import routes from './routes';
import controllers from './controllers';
import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());

const router = express.Router();
app.use(router);

router.get(routes.getProducts, controllers.products.getAll);
router.get(routes.getProduct, controllers.products.get);
router.get(routes.getReviews, controllers.products.getReviews);
router.post(routes.addProduct, controllers.products.add);

router.get(routes.getUsers, controllers.user.getAll);

export default app;