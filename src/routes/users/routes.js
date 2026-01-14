import { Router } from "express";
import { usersController as UC } from '../../controllers/index.js'

const routerUsers = Router();

routerUsers.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        mensagem: 'API usuários funcionando'
    })
})

routerUsers.get('/', UC.getUsers);

routerUsers.get('/search', UC.getUsers);

routerUsers.post('/', UC.postUser);

routerUsers.get('/:id', UC.getUser);

routerUsers.put('/:id', UC.putUser);

routerUsers.patch('/:id', UC.patchUser);

routerUsers.delete('/:id', UC.deleteUser);

export { routerUsers }
