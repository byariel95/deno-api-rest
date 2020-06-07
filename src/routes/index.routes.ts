import { Router } from "https://deno.land/x/oak/mod.ts";
import  { getIndex, getUsers,crateUsers, getUser, deleteUser,  updateUsers } from '../controllers/index.controller.ts';

const router = new Router();

router.get('/',getIndex)
      .get('/users',getUsers)
      .get('/users/:id',getUser)
      .post('/users',crateUsers)
      .put('/users/:id',updateUsers)
      .delete('/users/:id',deleteUser);


export default router;