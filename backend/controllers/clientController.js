
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'maphoskho_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });


exports.addClient = async (req, res)=>{
    const user_id = req.params.user_id;
    const {fullName, phoneNr , email,service } = req.body;
    
    
    const sql = 'INSERT INTO clients (fullName, phoneNr, email,service, user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING client_id';
 
    db.query(sql,[fullName,phoneNr , email ,service, user_id],(err,results)=>{
        if(err)
        {
            
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your client was successfully added '});
        }

    });
}



exports.getClients = async (req, res)=>{

    const sql = 'SELECT * FROM clients WHERE user_id = $1';
    db.query(sql,[user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}





exports.getOneClient = async (req, res)=>{
    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM clients WHERE user_id = $1';
    db.query(sql,[user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}












