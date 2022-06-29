import User from "../model/user_model.js"
import {Op} from "sequelize"


export const getUser=async(req,res)=>{
    const last_id=parseInt(req.query.lastId)|| 0
    const limit=parseInt(req.query.limit)|| 10
    const search=req.query.search_query||""
    let results=[]
    if (last_id<1) {
        const result =await User.findAll({
            where:{
                [Op.or]:[{name:{
                            [Op.like]:'%'+search+'%'}},
                        {email:{
                            [Op.like]:'%'+search+'%'}
    
                }],
    
            },limit:limit,
            order:[
            ['id','DESC']
            ]
        })
        results=result
    } else {
        const result =await User.findAll({
            where:{
                id:{
                    [Op.lt]:last_id
                },
                [Op.or]:[{name:{
                            [Op.like]:'%'+search+'%'}},
                        {email:{
                            [Op.like]:'%'+search+'%'}
    
                }],
    
            },limit:limit,
            order:[
            ['id','DESC']
            ]
        })
        results=result  
    }
 
    res.json({
        result:results,
        lastId:results.length?results[results.length-1].id:0,
        hasMore:results.length>=limit ? true:false
    })

 } 