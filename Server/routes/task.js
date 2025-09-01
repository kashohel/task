import { Router } from 'express';
import taskContr from '../controller/taskController.js'
const route = Router();

route.get('/', taskContr.getAll);
route.post('/create', taskContr.create);
route.put('/update/:id', taskContr.update);
route.delete('/delete/:id', taskContr.remove);

export default route;