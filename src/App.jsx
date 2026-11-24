import './App.css'
import { useState, useEffect} from 'react';
function App() {
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState([]);
  const [hassearched, sethassearched] = useState(false);
  const [random, setrandom] = useState([]);
  const [ing, seting] = useState("");
  const [searching, setsearching] = useState([]);

  function func(e) {
    e.preventDefault();
    sethassearched(true);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`)
    .then((res) => res.json())
    .then((json) => setarr(json.meals || []))
  }

  function RandomFunc (e) {
   e.preventDefault();

   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
   .then((res) => res.json())
   .then((obj) => setrandom(obj.meals[0]))
  }

  function Ingridient (e) {
    e.preventDefault();
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ing)}`)
    .then((res) => res.json())
    .then((obj) => setsearching(obj.meals || []))
  }

  return (
    <>
      <form onSubmit={func}>
        <input value={search} onChange={(typing) => setsearch(typing.target.value)}></input>
         <button type="Submit">Search</button>
      </form>
      {arr.map((recipe) => (
        <div key={recipe.idMeal}>
           {recipe.strMeal}
        </div>
      ))}

      {hassearched && arr.length === 0 && <h2>No results ;v</h2>}

    <div>
      <h2>Generate a random food recipe</h2>
      <button onClick={RandomFunc}>Generate</button>
      <h2>{random.strMeal}</h2>
    </div>
        
    <div>
      <h2>Search by Ingridient</h2>
      <form onSubmit={Ingridient}>
         <input value={ing} onChange={(type) => seting(type.target.value)}></input>
         <button type="submit">Search</button>
      </form>

      {searching.map((arr) => (
        <div key={arr.idMeal}>
          {arr.strMeal}
        </div>
      ))}
    </div>
    </>
  )
}

export default App
