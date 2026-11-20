import './App.css'
import { useState} from 'react';
function App() {
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState([]);
  const [hassearched, sethassearched] = useState(false);

  function func(e) {
    e.preventDefault();
    sethassearched(true);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`)
    .then((res) => res.json())
    .then((json) => setarr(json.meals || []))
  }

  return (
    <>
      <form onSubmit={func}>
        <input value={search} onChange={(typing) => setsearch(typing.target.value)}></input>
         <button type="Submit">Search</button>
      </form>
      {arr.map((recipe) => (
        <h2 key={recipe.idMeal}>{recipe.strMeal}</h2>
      ))}
      ) : (
        {hassearched && arr.length === 0 && <h2>No results ;v</h2>}
      )}
        
    </>
  )
}

export default App
