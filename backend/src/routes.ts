import { Router } from 'express';

import ExclusionController from './controller/ExclusionController';

const routes = Router();

//TODO: Mudar para os metodos corretos patch, delete, etc...

routes.get('/getList', ExclusionController.index);

routes.post('/updateList', ExclusionController.update);

routes.post('/deleteId', ExclusionController.deleteId);

routes.post('/deleteTable', ExclusionController.deleteTable);

routes.post('/addTable', ExclusionController.save);

routes.post('/createConnection', ExclusionController.createConnection);

routes.get('/getDatabaseConfig', ExclusionController.getDatabaseConnection);

export default routes;
