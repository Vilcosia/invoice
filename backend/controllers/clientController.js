
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'maphoskho_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });


exports.addClient = async (req, res)=>{
    
    const {fullname, phone_no , email,service } = req.body;
    
    
    const sql = 'INSERT INTO clients (fullname, phone_no, email,service) VALUES ($1,$2,$3,$4) RETURNING client_id';
 
    db.query(sql,[fullname,phone_no , email ,service],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your client was successfully added '});
        }

    });
}



exports.getClients = async (req, res)=>{

    const sql = 'SELECT * FROM clients ';
    db.query(sql,(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}





exports.getOneClient = async (req, res)=>{
    

    const sql = 'SELECT * FROM clients WHERE client_id = $1';
    db.query(sql,[client_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}












