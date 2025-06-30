const { useState } = React;

function App() {
  const [screen, setScreen] = useState('recipeList');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    {
      name: 'Spaghetti',
      time: '30 min',
      servings: 'Serves 4',
      image: 'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-3-1200.jpg',
    },
    {
      name: 'Omelette',
      time: '15 min',
      servings: 'Serves 2',
      image: 'https://www.sweetashoney.co/wp-content/uploads/Omelette-2-1024x640.jpg',
    },
  ];

  return (
    <div className="container">
      {screen === 'recipeList' && (
        <div className="screen">
          <div className="header">
            <div>Recipe List</div>
            <div>👤</div>
          </div>
          <div className="cards">
            {recipes.map((r) => (
              <div
                key={r.name}
                className="card"
                onClick={() => { setSelectedRecipe(r); setScreen('recipeDetail'); }}
              >
                <img src={r.image} />
                <h3>{r.name}</h3>
                <div>{r.time} • {r.servings}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === 'recipeDetail' && selectedRecipe && (
        <div className="screen">
          <div className="header">
            <div>{selectedRecipe.name}</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeList')}>⬅ Back</div>
          </div>
          <img src={selectedRecipe.image} style={{width:'100%',borderRadius:'6px',marginTop:'10px'}} />
          <div className="button" onClick={() => setScreen('addToCalendar')}>Add to Calendar</div>
        </div>
      )}

      {screen === 'addToCalendar' && (
        <div className="screen">
          <div className="header">
            <div>Add to Meal Plan</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeDetail')}>⬅ Back</div>
          </div>
          <p>Date selection and portion options here.</p>
          <div className="button" onClick={() => setScreen('mealPlanCalendar')}>Save Meal Plan</div>
        </div>
      )}

      {screen === 'mealPlanCalendar' && (
        <div className="screen">
          <div className="header">
            <div>Meal Plan Calendar</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeList')}>⬅ Home</div>
          </div>
          <p style={{textAlign:'center'}}>Calendar View Placeholder</p>
          <div className="button" onClick={() => setScreen('pantryChecklist')}>Generate Shopping List</div>
        </div>
      )}

      {screen === 'pantryChecklist' && (
        <div className="screen">
          <div className="header">
            <div>Pantry Checklist</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('mealPlanCalendar')}>⬅ Back</div>
          </div>
          <ul>
            <li><input type="checkbox" /> Eggs</li>
            <li><input type="checkbox" /> Flour</li>
            <li><input type="checkbox" /> Milk</li>
          </ul>
          <div className="button" onClick={() => setScreen('shoppingList')}>Continue</div>
        </div>
      )}

      {screen === 'shoppingList' && (
        <div className="screen">
          <div className="header">
            <div>Shopping List</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeList')}>⬅ Home</div>
          </div>
          <ul>
            <li>Flour - 500g</li>
            <li>Milk - 1 liter</li>
          </ul>
          <div className="button" onClick={() => { alert('Exported!'); setScreen('recipeList'); }}>Export and Finish</div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
