import  express  from "express";

import  {getUser}  from "../controller/user_c.js"; 

const router=express.Router();

router.get('/users',getUser)

export default router