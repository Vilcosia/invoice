
const db = require("../Config/db");
const jwt = require("jsonwebtoken");

const Pool = require('pg').Pool;
require('dotenv').config();


exports.addInvoice = async (req, res)=>{
    
    const {client, service , amount } = req.body;
    //const freelancer = req.params.freelancer;
    
    const sql = 'INSERT INTO invoices (client, service , amount,status) VALUES ($1,$2,$3,$4) RETURNING invoice_id';
 
    db.query(sql,[client,service ,amount ,"pending"],(err,results)=>{
        if(err)
        {
            console.log(err)
            res.status(400).json({message:'Query failed'});
        }else
        {
            res.status(200).json({message: 'Your invoice was successfully added '});
        }

    });
}



exports.getInvoice = async (req, res)=>{

    const sql = 'SELECT * FROM invoices ';
    db.query(sql,(error,results)=>{
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
    const sql = 'SELECT * FROM invoices WHERE status = $1 ';
    db.query(sql,[paid,req.params.ivoice_id,req.params.invoice_id],(error,results)=>{
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
    const sql = 'SELECT * FROM invoices WHERE status = $1 ';
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

    const sql = 'SELECT * FROM invoices WHERE invoice_id = $1';
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


    // const invoice_id = req.params.invoce_id;
    const sql = 'SELECT * FROM invoices WHERE user_id = $1 ';
    db.query(sql,[invoice_id],(error,results)=>{
        if(error)
        {
            res.status(400).json({message:'Query failed'});
        }else{

            res.status(200).json(results.rows);

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


