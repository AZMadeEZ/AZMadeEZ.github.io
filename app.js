const { useState } = React;

function App() {
  const [screen, setScreen] = useState('recipeList');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [servings, setServings] = useState(1);
  const [plannedMeals, setPlannedMeals] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const recipes = [
    {
      name: 'Spaghetti',
      time: '30 min',
      servings: 'Serves 4',
      image: 'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-3-1200.jpg',
      ingredients: [
        '8 ounces spaghetti',
        '2 to 3 tablespoons olive oil',
        '3 to 4 cloves garlic',
        '1 can diced tomatoes',
        'Salt and pepper',
        'Red pepper flakes',
        'Basil',
        'Parmesan cheese'
      ],
      instructions: [
        'Cook spaghetti according to package directions; drain and set aside.',
        'While spaghetti cooks, heat olive oil in skillet over medium-high heat.',
        'Add garlic and sauté 1 minute.',
        'Add tomatoes, salt, pepper, red pepper flakes, and basil.',
        'Simmer 5 minutes.',
        'Add spaghetti and toss.',
        'Sprinkle with Parmesan.'
      ]
    },
    {
      name: 'Omelette',
      time: '15 min',
      servings: 'Serves 2',
      image: 'https://www.sweetashoney.co/wp-content/uploads/Omelette-2-1024x640.jpg',
      ingredients: [
        '2 large eggs',
        '2 tablespoons milk',
        'Salt and pepper',
        '1 tablespoon butter',
        '1/4 cup shredded cheese',
        'Herbs or vegetables'
      ],
      instructions: [
        'Whisk eggs, milk, salt, and pepper.',
        'Heat butter in skillet.',
        'Pour eggs and cook until edges set.',
        'Add cheese and fillings.',
        'Fold and cook 1-2 minutes.',
        'Serve warm.'
      ]
    }
  ];

  const handleSaveMeal = () => {
    setPlannedMeals([...plannedMeals, {
      date: selectedDate,
      recipe: selectedRecipe,
      servings
    }]);
    setScreen('mealPlanCalendar');
  };

  const allIngredients = Array.from(new Set(
    plannedMeals.flatMap(m => m.recipe.ingredients)
  ));

  const toggleIngredient = (ingredient) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingredient]: !prev[ingredient]
    }));
  };

  const shoppingList = allIngredients.filter(i => !checkedIngredients[i]);

  return (
    <div className="container">
      {screen === 'recipeList' && (
        <div className="screen">
          <div className="header">
            <div>Recipe List</div>
            <div>👤</div>
          </div>
          <div className="cards">
            {recipes.map(r => (
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
          <div className="section">
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h3>Instructions</h3>
            <ol>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="button" onClick={() => setScreen('addToCalendar')}>
            Add to Calendar
          </div>
        </div>
      )}

      {screen === 'addToCalendar' && (
        <div className="screen">
          <div className="header">
            <div>Add to Meal Plan</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeDetail')}>⬅ Back</div>
          </div>
          <div style={{marginTop: '10px'}}>
            <label>
              <strong>Select Date:</strong><br />
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                style={{marginTop:'5px',width:'100%'}}
              />
            </label>
          </div>
          <div style={{marginTop:'10px'}}>
            <label>
              <strong>Number of Servings:</strong><br />
              <input
                type="number"
                min="1"
                value={servings}
                onChange={e => setServings(e.target.value)}
                style={{marginTop:'5px',width:'100%'}}
              />
            </label>
          </div>
          <div className="button" style={{marginTop:'15px'}} onClick={handleSaveMeal}>
            Save Meal Plan
          </div>
        </div>
      )}

      {screen === 'mealPlanCalendar' && (
        <div className="screen">
          <div className="header">
            <div>Meal Plan Calendar</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeList')}>⬅ Home</div>
          </div>
          {plannedMeals.length === 0 ? (
            <p>No meals planned.</p>
          ) : (
            <ul>
              {plannedMeals.map((m, i) => (
                <li key={i}>
                  <strong>{m.date || 'No date'}</strong>: {m.recipe.name} ({m.servings} servings)
                </li>
              ))}
            </ul>
          )}
          <div className="button" onClick={() => setScreen('pantryChecklist')}>
            Generate Shopping List
          </div>
        </div>
      )}

      {screen === 'pantryChecklist' && (
        <div className="screen">
          <div className="header">
            <div>Pantry Checklist</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('mealPlanCalendar')}>⬅ Back</div>
          </div>
          {allIngredients.length === 0 ? (
            <p>No ingredients to check.</p>
          ) : (
            <ul>
              {allIngredients.map(i => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={!!checkedIngredients[i]}
                    onChange={() => toggleIngredient(i)}
                  /> {i}
                </li>
              ))}
            </ul>
          )}
          <div className="button" onClick={() => setScreen('shoppingList')}>
            Continue
          </div>
        </div>
      )}

      {screen === 'shoppingList' && (
        <div className="screen">
          <div className="header">
            <div>Shopping List</div>
            <div style={{cursor:"pointer"}} onClick={() => setScreen('recipeList')}>⬅ Home</div>
          </div>
          {shoppingList.length === 0 ? (
            <p>All ingredients checked off!</p>
          ) : (
            <ul>
              {shoppingList.map(i => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
          <div className="button" onClick={() => { alert('Shopping list saved!'); setScreen('recipeList'); }}>
            Export and Finish
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
