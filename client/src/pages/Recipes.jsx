import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Recipes=()=> {
    const[recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(()=> {
        const fetchAllRecipes = async ()=> {
            try{
                const res = await axios.get("http://localhost:3000/recipes")
                setRecipes(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllRecipes();
    },[])

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/recipes?name=${searchTerm}`);
                setRecipes(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
    }, [searchTerm]);

    const handleDelete = async (id)=> {
        try{
            await axios.delete("http://localhost:3000/recipes/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div>
        <h1>Recipe List</h1>
        <div>
            <input type="text" placeholder="Search Recipe" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        <div className="recipes">
            {recipes.map(recipe=>(
                <div className="recipe" key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <h3>Difficulty: {recipe.difficulty}</h3>
                    <h3>Location: {recipe.location}</h3>
                    <p>Taste Type: {recipe.taste}</p>
                    <p>Ingredients: {recipe.ingredients}</p>
                    <p>Description: {recipe.descript}</p>
                    <button className="update"><Link to={`/update/${recipe.id}`}>Update</Link></button>
                    <button className="delete" onClick={()=>handleDelete(recipe.id)}>Delete</button>
                </div>
            ))}
        </div>
        <button>
            <Link to="/add">Add a new recipe</Link>
        </button>
    </div>
    
}

export default Recipes