import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost", 
    user:"root", 
    password:"MSTsenior2025!",
    database:"recipeit"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=> {
    res.json("hello this is backend")
})

app.get("/recipes", (req, res)=> {
    const searchQuery = req.query.name;
    let q = "SELECT * FROM recipes";
    let params = []; // Initialize params array

    if (searchQuery) {
        q += " WHERE name LIKE ?";
        params.push(`%${searchQuery}%`); 
    }

    db.query(q, params, (err, data)=> {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.post('/recipes', (req, res) => {
    const { name, difficulty, location, taste, ingredients, descript } = req.body;
    const q = 'INSERT INTO recipes SET?';
    const values = { name, difficulty, location, taste, ingredients, descript };
  
    db.query(q, values, (err, data) => {
      if (err) {
        res.json({ error: 'Error creating recipe' });
      } else {
        res.json({ message: 'Recipe created successfully!' });
      }
    });
});

app.delete("/recipes/:id", (req, res)=> {
    const recipeID = req.params.id;
    const q = "DELETE FROM recipes WHERE id = ?"

    db.query(q, [recipeID], (err, data)=> {
        if(err) return res.json(err);
        return res.json("Book deleted successfully.")
    })
})

app.put("/recipes/:id", (req, res) => {
    const recipeID = req.params.id;
    const { name, difficulty, location, taste, ingredients, descript } = req.body;
    const q = "UPDATE recipes SET `name` = ?, `difficulty` = ?, `location` = ?, `taste` = ?, `ingredients` = ?, `descript` = ? WHERE id = ?";
    const values = [name, difficulty, location, taste, ingredients, descript, recipeID];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Recipe updated successfully.");
    });
});

app.get("/recipes/:id", (req, res) => {
    const recipeID = req.params.id;
    const q = "SELECT * FROM recipes WHERE id =?";
  
    db.query(q, [recipeID], (err, data) => {
      if (err) return res.json(err);
      if (data.length === 0) return res.status(404).json({ message: "Recipe not found" });
      return res.json(data[0]);
    });
  });

app.listen(3000, ()=> {
    console.log("Server connected")
})