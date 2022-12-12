
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'admin',  //Database username
    host: 'localhost',  //Database host
    database: 'maphoskho_db', //Database database
    password: 'admin12345', //Database password
    port: 5432//Database port
  });


exports.addInvoice = async (req, res)=>{
    const user_id = req.params.user_id;
    const {title, price , description } = req.body;
    //const freelancer = req.params.freelancer;
    
    const sql = 'INSERT INTO invoices (post_price, post_title, post_desc, user_id, hidden,status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING post_id';
 
    db.query(sql,[price,title , description , user_id, false,"No Status"],(err,results)=>{
        if(err)
        {
            
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your post was successfully added '});
        }

    });
}



exports.getPosts = async (req, res)=>{

    const sql = 'SELECT * FROM invoices WHERE   status = $1';
    db.query(sql,[false,'No Status'],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getPaid = async (req, res)=>{
    
    paid= 'Paid';
    const sql = 'SELECT * FROM invoices WHERE status = $1 and (user_id = $2)';
    db.query(sql,[paid,req.params.user_id,req.params.user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{
            

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getPending = async (req, res)=>{
    pending = 'Pending';
    const sql = 'SELECT * FROM invoices WHERE (user_id = $2  and status = $1 ';
    db.query(sql,[pending,req.params.user_id,req.params.user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getOneInvoice = async (req, res)=>{
    const user_id = req.params.user_id;

    const sql = 'SELECT * FROM invoices WHERE user_id = $1';
    db.query(sql,[user_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.getInvoices = async (req, res)=>{


    const user_id = req.params.user_id;
    const sql = 'SELECT * FROM invoices WHERE user_id = $1 ';
    db.query(sql,[user_id,false],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

        }

    })
    
}

exports.deleteInvoice = async (req, res)=>{

    const sql = 'UPDATE invoices SET hidden = $2 WHERE invoice_id = $1';
    db.query(sql,[req.params.invoice_id,true],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json({message:'Invoice Deleted'});

        }

    })
    
}





exports.updateStatus = async (req, res)=>{
    
   
    const {status,invoice_id} = req.body;

    db.query(
      'UPDATE invoice SET status = $1 WHERE invoice_id = $2',
      [status,invoice_id],
      (error, results) => {
        if (error) {

            res.status(400).json({message:error.message});

        }else{res.status(200).json({message:'Your invoice was updated successfully'});}
      }
    )
}


