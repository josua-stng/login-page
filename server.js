import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";

dotenv.config();

const app = express();
const PORT = 3001;

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(bodyParser.json());
// CORS handling with Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); // <-- tambahkan OPTIONS
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// get user login
app.get("/users", (req, res) => {
  pool.query(`SELECT * FROM user_login`, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return;
    }
    return res.status(200).json(result.rows);
  });
});

// register user
app.post("/user/register", (req, res) => {
  const { username, password } = req.body;
  pool.query(
    `SELECT * FROM user_login WHERE username = $1`,
    [username],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }
      if (result.rowCount > 0) {
        res.status(400).send("Username Already Exist");
        return;
      }
      pool.query(
        `SELECT * FROM user_login WHERE password = $1`,
        [password],
        (error, result) => {
          if (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
            return;
          }
          if (result.rowCount > 0) {
            res.status(400).send("Password Already Exist");
            return;
          }

          pool.query(
            `INSERT INTO user_login (username,password) VALUES ($1,$2)`,
            [username, password],
            (error, result) => {
              if (error) {
                console.error(error);
                res.status(500).send(`Internal Server Error`);
                return;
              }
              res.status(201).send({
                status: 201,
                message: "Success Create Account",
              });
            }
          );
        }
      );
    }
  );
});

// delete user;
app.delete('/users/:id',(req,res)=>{
  const {id} = req.params;
  pool.query(
      `DELETE FROM user_login where id=${id}`,
      (error,result)=>{
          if (error) {
              console.error(error);
              res.status(500).send(`Internal server error`);
              return;
            }
            else if(result.rowCount === 0){
              return res.send({
                status:500,
                message:'Failed delete, Id not found'
              })
            }
            return res.status(201).send(`Users successfuly deleted`);
      }
  )
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
