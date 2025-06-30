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
      ingredients: [
        '8 ounces spaghetti',
        '2 to 3 tablespoons olive oil',
        '3 to 4 cloves garlic, finely minced',
        '1 can (14.5 ounces) diced tomatoes (undrained)',
        'Salt and freshly ground black pepper, to taste',
        '1/4 teaspoon crushed red pepper flakes, or to taste',
        '1 teaspoon dried basil (or fresh to garnish)',
        '1/4 cup grated Parmesan cheese, optional'
      ],
      instructions: [
        'Cook spaghetti according to package directions; drain and set aside.',
        'While spaghetti cooks, add olive oil to a large skillet and heat over medium-high heat.',
        'Add the garlic and sauté for about 1 minute, stirring constantly.',
        'Add the diced tomatoes (with juices), salt, pepper, red pepper flakes, and basil.',
        'Stir to combine and simmer for 5 minutes.',
        'Add cooked spaghetti and toss to coat evenly.',
        'Sprinkle with Parmesan and serve immediately.'
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
        'Salt and pepper, to taste',
        '1 tablespoon butter',
        '1/4 cup shredded cheese (optional)',
        'Chopped herbs or vegetables (optional)'
      ],
      instructions: [
        'In a bowl, whisk eggs, milk, salt, and pepper.',
        'Heat butter in a non-stick skillet over medium heat.',
        'Pour in egg mixture and swirl to coat the pan evenly.',
        'Cook without stirring until the edges set.',
        'Add cheese and any fillings if desired.',
        'Fold omelette in half and cook for 1-2 minutes more.',
        'Slide onto a plate and serve warm.'
      ]
    }
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
