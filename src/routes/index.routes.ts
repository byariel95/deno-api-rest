import { Router } from "https://deno.land/x/oak/mod.ts";
import  { getIndex, getUsers,crateUsers } from '../controllers/index.controller.ts';

const router = new Router();

router.get('/',getIndex)
      .get('/users',getUsers)
      .post('/users',crateUsers);

export default router;