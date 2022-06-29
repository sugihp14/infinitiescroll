import { Sequelize } from "sequelize";
import db from "../config/config.js";

const {DataTypes}=Sequelize;
const User=db.define('Users',{

    name:{
        type:DataTypes.STRING},
    email:{
        type:DataTypes.STRING},
    gender:{
        type:DataTypes.STRING
    }

},{
    freezeTableName:true
});



// (async()=>{
//     await db.sync()
// })();

export default User
