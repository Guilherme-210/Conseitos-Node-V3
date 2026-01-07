import { Router } from "express";
import { usersController as UC } from '../../controllers/index.js'

const routerUsers = Router();

routerUsers.get('/', UC.getUsers);

routerUsers.get('/:id', UC.getUser);

export { routerUsers }