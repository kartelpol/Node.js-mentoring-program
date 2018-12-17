import * as config from './config/taskInfo.json';
import logger from './config/logger';
import { Product, User } from 'models';


logger.info(config.name);

const product = new Product();
const user = new User();
