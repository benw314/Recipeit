import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update=()=> {
    const [recipe, setRecipes] = useState({
        name: "", 
        difficulty: "", 
        location: "",
        taste: "",
        ingredients: "",
        descript: "",
    });

    const navigate = useNavigate()
    const location = useLocation()
    const recipeID = location.pathname.split("/")[2]

    useEffect(()=> {
        const fetchAllRecipes = async ()=> {
            try{
                const res = await axios.get(`http://localhost:3000/recipes/${recipeID}`);
                setRecipes(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        fetchAllRecipes();
    },[recipeID])

    const handleChange=(e)=> {
        setRecipes((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick= async e=>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:3000/recipes/"+recipeID, recipe)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    console.log(recipe)

    return (
        <div className='form'>
          <h1>Update Recipe</h1>
          <input type="text" placeholder='Name...' onChange={handleChange} name="name" value={recipe.name} />
          <input type="text" placeholder='Difficulty (1-5)...' onChange={handleChange} name="difficulty" value={recipe.difficulty}/>
          <input type="text" placeholder='Location...' onChange={handleChange} name="location" value={recipe.location} />
          <input type="text" placeholder='Taste type...' onChange={handleChange} name="taste" value={recipe.taste} />
          <input type="text" className="ingredient-input" placeholder='Ingredients...' onChange={handleChange} name="ingredients" value={recipe.ingredients} />
          <input type="text" className="description-input" placeholder='Recipe description...' onChange={handleChange} name="descript" value={recipe.descript} />
          <button className="formButton" onClick={handleClick}>Update Recipe</button>
        </div>
      );
}

export default Update;