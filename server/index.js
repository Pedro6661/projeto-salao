const express = require("express");
const app = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors");


/*const db = mysql.createPool({
    host:"localhost",
    port:'3307',
    user:"root",
    password:"catolica",
    database:"projetosalao",

})*/

const db = mysql.createPool({
  host:"localhost",
  port:'3306',
  user:"root",
  password:"",
  database:"projetosalao",

})

app.use(cors());
app.use(express.json());

app.post("/register",(req, res)=>{
   const {nome} = req.body;
   const {telefone} = req.body;

   let SQL = "INSERT INTO clientes(nome,telefone) VALUES (?,?)";

   db.query(SQL,[nome,telefone],(err, result)=>{
        console.log(err);

   })
});
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM clientes";

    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar clientes" });
        } else {
            res.json(result); // Enviar os dados dos clientes como resposta
        }
    });
});
app.delete("/excluir/:id", (req, res) => {
    const clienteId = req.params.id;
  
    // Execute uma consulta SQL para excluir o cliente com base no ID
    const SQL = "DELETE FROM clientes WHERE id = ?";
    db.query(SQL, [clienteId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir cliente" });
      } else {
        res.json({ message: "Cliente excluído com sucesso" });
      }
    });
  });
  app.put("/editar/:id", (req, res) => {
    const clienteId = req.params.id;
    const { nome, telefone } = req.body;
  
    // Execute uma consulta SQL para atualizar os dados do cliente com base no ID
    const SQL = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?";
    db.query(SQL, [nome, telefone, clienteId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao editar cliente" });
      } else {
        res.json({ message: "Cliente editado com sucesso" });
      }
    });
  });  
app.listen(3001,()=>{
    console.log("rodando servidor");
});
