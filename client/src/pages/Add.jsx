import React from 'react'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add=()=> {
    const [recipe, setRecipe] = useState({
        name: "", 
        difficulty: "", 
        location: "",
        taste: "",
        ingredients: "",
        descript: "",
    });

    const navigate = useNavigate(); 

    const handleChange=(e)=> {
        setRecipe((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick= async e=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:3000/recipes", recipe)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    console.log(recipe)

    return(
        <div className='form'>
            <h1>Add New Recipe</h1>
            <input type="text" placeholder='Name...' onChange={handleChange} name="name"/>
            <input type="text" placeholder='Difficulty (1-5)...' onChange={handleChange} name="difficulty"/>
            <input type="text" placeholder='Location...' onChange={handleChange} name="location"/>
            <input type="text" placeholder='Taste type...' onChange={handleChange} name="taste"/>
            <input type="text" className="ingredient-input" placeholder='Ingredients...' onChange={handleChange} name="ingredients"/>
            <input type="text" className="description-input" placeholder='Recipe description...' onChange={handleChange} name="descript"/>
            <button className="formButton" onClick={handleClick}>Add Recipe</button>
        </div>
    )
}

export default Add