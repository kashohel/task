import { Router } from 'express';
import taskContr from '../controller/taskController'
const route = Router();

route.get('/', taskContr.getAll);
route.post('/create', taskContr.create);
route.post('/update/:id', taskContr.update);
route.post('/delete/:id', taskContr.remove);

export default route;