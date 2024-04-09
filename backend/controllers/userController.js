//const db = require("../config/db");
const jwt = require("jsonwebtoken");

const Pool = require('pg').Pool;
require('dotenv').config();


const db = new Pool({
    user: "postgres" ,
    host:"localhost",  
    database: "maphoskho_db", 
    password: "Lethabo2015!!", 
    port: "5432"
  });


exports.register = async (req, res)=>{ 
    console.log(req.body)


    const { email , password ,firstname ,lastname} = req.body;

    const sql = 'SELECT * FROM users WHERE email = $1 ';
    db.query(sql,[email],(err, results)=>{
        if(results.rowCount == 0)
        {
            
                db.query(
                    'INSERT INTO users (firstname,lastname,email,password) VALUES ($1,$2,$3,$4) RETURNING user_id',[firstname,lastname,email,password],
                    (db_err,results) => {
                        if(db_err)
                        {
                            res.status(400).json({message:'Query failed'});
                        }else
                        {
                            res.status(200).json({message: firstname+' has been registered, Please login'});
                        }
                        
                        
                    
            })
        }else
        {
            res.status(400).json({message:'User already exists, Please login!'});
        }
    });
}

exports.login =  (req, res)=>{
    
    const {email,password} = req.body;
    const sql = 'SELECT * FROM users WHERE email = $1 ';
    db.query(sql,[email],(err, results)=>{
        if(err) 
        {
            
            res.status(400).json({message: "Error communicating with database"})
        
        }
        else{
            if(results.rowCount == 0)
            {
                res.status(400).json({message: "User does not exist, Please register"})
            }else{
                //bcrypt.compare(password,results.rows[0].password,(passErr,result)=> {
                    if(password != results.rows[0].password)
                    {
                        res.status(400).json({message: "Invalid Credentials, Please try again"});

                    }else
                    {
                        const token = jwt.sign({
                                user_id: results.rows[0].user_id,
                                email: results.rows[0].email,
                                fisrtname: results.rows[0].firstname,
                                lastname: results.rows[0].lastname,
                                password: results.rows[0].password,
                                
                            },
                            "process.env.SECRET_KEY",{
                                algorithm: 'HS256',
                                expiresIn: 120
                            });
                            res.status(200).json({message: "Welcome! "+results.rows[0].name,token: token,}); 
                   }
                //})
                 
                    
                }

            

        }

    })  
}

exports.getOneUser = (req, res) => {

    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM users WHERE user_id = $1';
    db.query(sql,[user_id],(err, results)=>{
        if(err) { res.status(400).json({message:'Query failed'}) }else{
            res.status(200).json(results.rows[0]);
        }
    })
}



exports.updateUser = async (req, res)=>{
   
    const user_id = req.params.user_id;
    const { password ,firstname ,lastname} = req.body;
  
    db.query(
      'UPDATE users SET password = $1 ,firstname = $2, lastname = $3 WHERE user_id = $5',
        [password ,firstname ,lastname , user_id],
       (error,results) => {
        if (error) {
            res.status(400).json({message:'Query failed'});
        }else {res.status(200).json({message:'Your profile was updated successfully'});}
    
      })
}

exports.updateImage = async (req,res) => {
    //console.log(req.body.link)

    const link = req.body.link;
    const user_id = req.params.user_id;

    db.query('UPDATE users SET image = $1 WHERE user_id = $2',[link,user_id],(err,results)=>{
        if(err){
            res.status(400).json({message:err.message});
        }else
        {
            res.status(200).json({message:'Your profile picture was updated successfully'});
        }

    })
}
