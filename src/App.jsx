import './App.css'
import { useState} from 'react';
function App() {
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState([]);
  const [hassearched, sethassearched] = useState(false);
  const [random, setrandom] = useState([]);

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
        
    </>
  )
}

export default App
