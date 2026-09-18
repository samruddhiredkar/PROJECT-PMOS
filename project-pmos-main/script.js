/**
 * Project PMOS - Vanilla JavaScript Application
 * All interactive frontend logic for the PMOS wellness prototype.
 */

// Global State - Fresh Default State (0% checked initially)
const state = {
  activeSection: 'dashboard',
  activeCareSubtab: 'skin',
  routineType: 'exercise',
  activeDay: 1,
  dietaryFilter: 'all',
  mealTimeFilter: 'all',
  selectedMood: null,
  skinType: 'oily',
  skinFocus: 'breakouts',
  hairType: 'straight',
  hairConcern: 'shedding',
  loggedSymptoms: new Set(['bloating']),
  medications: [
    { id: 1, name: 'Myo-Inositol & Folic Acid', time: '08:30 AM', tag: 'With Breakfast', taken: true },
    { id: 2, name: 'Vitamin D3 & K2 Drop', time: '01:30 PM', tag: 'Post Lunch', taken: false },
    { id: 3, name: 'Magnesium Glycinate', time: '09:30 PM', tag: 'Before Bed', taken: false }
  ],
  dashboardChecklist: {
    move: false,
    nourish: false,
    selfcare: false,
    mood: false
  },
  exerciseCompleted: {},
  yogaCompleted: {},
  breathingInterval: null,
  breathingRunning: false,
  journalEntries: [
    { id: 1, text: "Grateful for morning sunlight, warm turmeric latte, and finishing day 1 yoga without knee pain.", time: "Aug 15, 2026" }
  ]
};

// Indian Nutrition Recipes Database
const recipes = [

  // =========================================================
  // BREAKFAST
  // =========================================================

  {
    id: 'veg-moong-chilla',
    name: 'Moong Dal Chilla',
    type: 'veg',
    category: 'breakfast',
    time: '20 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR4tbJo_Jt5jDPV_aZRJ2XU41GEI5Bqmx5Abiv5OAWtw&s=10',
    description: 'Savory lentil crepe made with soaked yellow moong dal, ginger, green chilies, and spinach.',
    ingredients: [
      'Soaked yellow moong dal',
      'Ginger',
      'Green chilies',
      'Spinach'
    ],
    instructions: [
      'Blend soaked moong dal into a smooth batter.',
      'Add ginger, green chilies, and spinach.',
      'Pour the batter onto a hot pan like a dosa.',
      'Cook until the chilla becomes crisp.',
      'Serve with mint chutney.'
    ],
    wellnessTip: 'Moong dal is a low-GI lentil and provides dietary protein and fiber.'
  },

  {
    id: 'veg-chia-oat-porridge',
    name: 'Overnight Chia & Oat Porridge',
    type: 'veg',
    category: 'breakfast',
    time: 'Overnight',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx5H4AwtnryxT8qwV-bnzXkD0fna5hs4on4yYQmZzy9fSj3wWsugeD908&s=10',
    description: 'A fiber-rich overnight breakfast combining oats and chia seeds.',
    ingredients: [
      'Oats',
      'Chia seeds'
    ],
    instructions: [
      'Combine oats and chia seeds in a bowl or jar.',
      'Add your preferred liquid.',
      'Mix thoroughly.',
      'Cover and refrigerate overnight.',
      'Serve chilled the next morning.'
    ],
    wellnessTip: 'Chia seeds provide dietary fiber and can be included as part of a balanced breakfast.'
  },

  {
    id: 'veg-red-poha',
    name: 'Red Poha with Peanuts & Green Peas',
    type: 'veg',
    category: 'breakfast',
    time: '15 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://www.indianveggiedelight.com/wp-content/uploads/2022/07/poha.jpg',
    description: 'Red poha cooked with peanuts, green peas, curry leaves, and turmeric.',
    ingredients: [
      'Flattened red rice (poha)',
      'Peanuts',
      'Green peas',
      'Curry leaves',
      'Turmeric'
    ],
    instructions: [
      'Wash the poha.',
      'Sauté curry leaves, peanuts, and green peas in 1 tsp oil.',
      'Add the washed poha.',
      'Mix in turmeric.',
      'Cook until everything is combined and heated through.'
    ],
    wellnessTip: 'Red poha is presented as a lower-glycemic alternative to white poha in the provided nutrition plan.'
  },

  {
    id: 'nonveg-spinach-mushroom-omelette',
    name: 'Spinach & Mushroom Omelette',
    type: 'nonveg',
    category: 'breakfast',
    time: '15 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://skinnyms.com/wp-content/uploads/2018/10/Souffle-Omelette-with-Mushrooms.jpg',
    description: 'Protein-rich omelette made with eggs, spinach, and mushrooms.',
    ingredients: [
      '2 whole eggs',
      'Chopped spinach',
      'Sliced mushrooms',
      'Black pepper'
    ],
    instructions: [
      'Whisk the eggs.',
      'Sauté spinach and mushrooms in a pan.',
      'Pour the eggs over the vegetables.',
      'Cook until the eggs are fully set.',
      'Fold the omelette and serve.'
    ],
    wellnessTip: 'Eggs provide protein, while spinach and mushrooms add vegetables to the meal.'
  },

  {
    id: 'nonveg-egg-avocado-toast',
    name: 'Boiled Egg & Avocado Toast',
    type: 'nonveg',
    category: 'breakfast',
    time: '15 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqSkE9JSNTV7hJur3AnX2DLcS9HPtgmeFAK6HJWJ0qGxCmsdWHOkTNym3N&s=10',
    description: 'Whole wheat toast topped with mashed avocado and sliced boiled eggs.',
    ingredients: [
      '2 hard-boiled eggs',
      'Half an avocado',
      '1 slice of 100% whole wheat bread',
      'Black pepper'
    ],
    instructions: [
      'Toast the whole wheat bread.',
      'Mash the avocado.',
      'Spread the avocado onto the toast.',
      'Slice the boiled eggs.',
      'Place the eggs on top and add pepper.'
    ],
    wellnessTip: 'Avocado provides unsaturated fats, while whole wheat bread contributes dietary fiber.'
  },

  {
    id: 'nonveg-chicken-sausage-scramble',
    name: 'Chicken Sausage & Pepper Scramble',
    type: 'nonveg',
    category: 'breakfast',
    time: '15 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://static.toiimg.com/thumb/75700672.cms?width=573&height=430',
    description: 'Egg scramble with chicken sausage and colorful bell peppers.',
    ingredients: [
      '2 eggs',
      '1 chicken sausage, sliced',
      'Green bell pepper',
      'Red bell pepper'
    ],
    instructions: [
      'Sauté the bell peppers and chicken sausage slices.',
      'Whisk the eggs.',
      'Add the eggs to the pan.',
      'Scramble until the eggs are fully cooked.',
      'Serve warm.'
    ],
    wellnessTip: 'This meal provides a protein-focused breakfast option without relying on refined breakfast carbohydrates.'
  },


  // =========================================================
  // LUNCH
  // =========================================================

  {
    id: 'veg-jowar-palak-dal',
    name: 'Jowar Roti with Palak Dal',
    type: 'veg',
    category: 'lunch',
    time: '30 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRM8a-BWIxzvm78gOUEUswYS2CwFGpHKHConUtITa-U7FxA_qUFgr6l6ph&s=10',
    description: 'Fiber-rich jowar roti served with spinach and toor dal.',
    ingredients: [
      'Jowar flour',
      'Spinach',
      'Toor dal',
      'Garlic',
      'Turmeric'
    ],
    instructions: [
      'Knead jowar flour with warm water.',
      'Shape the dough into rotis.',
      'Cook the rotis on a hot pan.',
      'Boil dal with spinach and turmeric.',
      'Temper the dal with garlic and serve with the roti.'
    ],
    wellnessTip: 'Jowar is a whole grain that contributes dietary fiber, while dal provides plant-based protein.'
  },

  {
    id: 'veg-quinoa-khichdi',
    name: 'Quinoa Khichdi with Mixed Vegetables',
    type: 'veg',
    category: 'lunch',
    time: '30 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyAIaGcJxBl3VEng6Jl-HrBdN1SgIfKcexLFq13q4CDA&s=10',
    description: 'Quinoa and yellow moong dal cooked with carrots and beans.',
    ingredients: [
      'Quinoa',
      'Yellow moong dal',
      'Carrots',
      'Beans',
      'Cumin seeds',
      'Turmeric'
    ],
    instructions: [
      'Wash quinoa and dal.',
      'Add them to a pressure cooker.',
      'Add chopped carrots and beans.',
      'Add cumin seeds and a pinch of turmeric.',
      'Pressure cook together for 2 whistles.'
    ],
    wellnessTip: 'Quinoa and moong dal provide a combination of plant-based protein, while vegetables add fiber.'
  },

  {
    id: 'veg-chickpea-salad',
    name: 'Chickpea (Chole) Salad Bowl',
    type: 'veg',
    category: 'lunch',
    time: '15 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdDqfrywKpzWh-pYv4Pt6aXDt2tWsuAgOU_pVGc8ruA&s=10',
    description: 'Fresh chickpea salad with cucumber, tomatoes, lemon juice, and olive oil.',
    ingredients: [
      'Boiled chickpeas',
      'Cucumber',
      'Tomatoes',
      'Lemon juice',
      'Olive oil'
    ],
    instructions: [
      'Dice the cucumber and tomatoes.',
      'Add the vegetables to boiled chickpeas.',
      'Squeeze fresh lemon juice over the mixture.',
      'Add a drizzle of olive oil.',
      'Toss everything together and serve.'
    ],
    wellnessTip: 'Chickpeas provide plant-based protein and dietary fiber.'
  },

  {
    id: 'nonveg-lemon-chicken-broccoli',
    name: 'Lemon-Herb Grilled Chicken with Broccoli',
    type: 'nonveg',
    category: 'lunch',
    time: '30 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrzIRU3fGfdcFOhBw1qdhUEN2ckj--vKMqllex_cVjmg&s=10',
    description: 'Grilled chicken breast served with lightly sautéed broccoli.',
    ingredients: [
      'Chicken breast',
      'Broccoli florets',
      'Garlic',
      'Olive oil',
      'Lemon'
    ],
    instructions: [
      'Marinate the chicken with lemon and garlic.',
      'Pan-grill the chicken until fully cooked.',
      'Lightly sauté the broccoli.',
      'Serve the chicken with the broccoli.'
    ],
    wellnessTip: 'Chicken provides protein, while broccoli adds a cruciferous vegetable to the meal.'
  },

  {
    id: 'nonveg-fish-curry-brown-rice',
    name: 'South Indian Fish Curry with Brown Rice',
    type: 'nonveg',
    category: 'lunch',
    time: '35 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTidBTRJ8acRhqKKpbO0k-75c7yWQATZVPLCiYlqy8qV4nonG9Y1EPz0aQ&s=10',
    description: 'Light South Indian-style fish curry served with brown rice.',
    ingredients: [
      'White fish pieces',
      'Tomato',
      'Tamarind extract',
      'Brown rice',
      'Turmeric'
    ],
    instructions: [
      'Prepare a light tomato and tamarind broth.',
      'Add the fish pieces.',
      'Simmer until the fish is fully cooked.',
      'Prepare the brown rice separately.',
      'Serve the fish curry with a small portion of brown rice.'
    ],
    wellnessTip: 'Fish can provide protein and, depending on the fish used, omega-3 fatty acids.'
  },

  {
    id: 'nonveg-chicken-tikka-millet-wrap',
    name: 'Chicken Tikka Millet Wrap',
    type: 'nonveg',
    category: 'lunch',
    time: '25 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLG2APuptk9xHXH5DTvBjsBqF06mXUpsuT8J7FmLCcwaWx2y5Qb1u7r4&s=10',
    description: 'Grilled chicken wrapped in a bajra roti with mint chutney and onions.',
    ingredients: [
      'Grilled chicken pieces',
      'Bajra (pearl millet) roti',
      'Mint chutney',
      'Sliced onions'
    ],
    instructions: [
      'Spread mint chutney over the bajra roti.',
      'Add grilled chicken pieces.',
      'Add sliced onions.',
      'Roll the roti tightly into a wrap.',
      'Serve immediately.'
    ],
    wellnessTip: 'Using a millet-based roti provides an alternative to refined-flour wraps.'
  },


  // =========================================================
  // EVENING SNACK
  // =========================================================

  {
    id: 'universal-sprouted-moong-chaat',
    name: 'Sprouted Moong Chaat with Cinnamon Tea',
    type: 'veg',
    category: 'evening',
    time: '10 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://images.indianexpress.com/2018/05/sprouted_moong_dal_salad-759.jpg',
    description: 'Fresh sprouted moong chaat served with cinnamon tea.',
    ingredients: [
      'Sprouted green gram',
      'Tomatoes',
      'Green tea bag',
      'Cinnamon powder',
      'Lemon'
    ],
    instructions: [
      'Mix sprouts with chopped tomatoes and lemon.',
      'Brew green tea.',
      'Stir in a pinch of cinnamon.',
      'Serve the chaat with the tea.'
    ],
    wellnessTip: 'Sprouted legumes provide fiber and plant-based nutrients.'
  },

  {
    id: 'universal-makhana-almonds',
    name: 'Roasted Makhana & Almonds',
    type: 'veg',
    category: 'evening',
    time: '10 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://cdn.shopify.com/s/files/1/0645/9650/8925/files/Vrat_Gulkand_Makhana_Laddoo_2.png?v=1785932250',
    description: 'Crunchy roasted makhana and almonds seasoned with black salt.',
    ingredients: [
      'Makhana',
      'Raw almonds',
      'Black salt',
      '1 tsp ghee'
    ],
    instructions: [
      'Dry roast the almonds.',
      'Separately roast makhana in ghee.',
      'Cook until the makhana becomes crunchy.',
      'Add black salt.',
      'Toss together and serve.'
    ],
    wellnessTip: 'Almonds provide unsaturated fats and makhana provides a crunchy snack option.'
  },

  {
    id: 'universal-greek-yogurt-blueberries',
    name: 'Greek Yogurt with Blueberries',
    type: 'veg',
    category: 'evening',
    time: '5 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://naturessoulshop.com/cdn/shop/files/Image1_c048dc15-ae13-40db-b27c-a15d7e1bc4db.png?v=1767428511&width=416',
    description: 'Plain unsweetened Greek yogurt topped with fresh or frozen blueberries.',
    ingredients: [
      'Plain unsweetened Greek yogurt',
      'Fresh or frozen blueberries'
    ],
    instructions: [
      'Scoop the yogurt into a bowl.',
      'Add the blueberries.',
      'Mix gently.',
      'Serve immediately.'
    ],
    wellnessTip: 'Greek yogurt provides protein, while blueberries contribute antioxidants.'
  },

  {
    id: 'nonveg-boiled-egg-chaat',
    name: 'Boiled Egg Pepper Chaat',
    type: 'nonveg',
    category: 'evening',
    time: '10 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://www.diversivore.com/wp-content/uploads/2023/08/Egg-Chaat-square-1.jpg   ',
    description: 'Simple boiled egg snack seasoned with chaat masala, pepper, and lemon.',
    ingredients: [
      '2 hard-boiled eggs',
      'Chaat masala',
      'Black pepper',
      'Lemon'
    ],
    instructions: [
      'Slice the boiled eggs.',
      'Sprinkle with chaat masala.',
      'Add black pepper.',
      'Finish with a few drops of lemon juice.'
    ],
    wellnessTip: 'Eggs provide a convenient source of protein for a snack.'
  },

  {
    id: 'nonveg-chicken-salami-rollups',
    name: 'Chicken Salami Cucumber Roll-ups',
    type: 'nonveg',
    category: 'evening',
    time: '10 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9jwws-wJ74KZ6_70yInyFnEmcx5cSYDH_9I1xIVkYaIqF5sDYSx09J9y&s=10',
    description: 'Cucumber strips rolled inside chicken salami slices.',
    ingredients: [
      '3 slices of chicken salami',
      'Half a cucumber',
      'Cream cheese (optional)'
    ],
    instructions: [
      'Slice the cucumber into thin strips.',
      'Place cucumber strips inside the chicken salami slices.',
      'Add cream cheese if desired.',
      'Roll tightly and serve.'
    ],
    wellnessTip: 'Cucumber contributes water and volume, while chicken salami provides protein.'
  },

  {
    id: 'nonveg-tuna-celery-bites',
    name: 'Tuna & Celery Bites',
    type: 'nonveg',
    category: 'evening',
    time: '10 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0IttWtykMljong-XU-qa3kFu_3wKtm7irOVbXP1O_ng&s=10',
    description: 'Tuna mixed with plain yogurt and served on crisp celery sticks.',
    ingredients: [
      'Canned tuna in water',
      'Celery sticks',
      'Plain yogurt'
    ],
    instructions: [
      'Drain the tuna.',
      'Mix the tuna with a spoonful of plain yogurt.',
      'Spoon the mixture onto celery sticks.',
      'Serve immediately.'
    ],
    wellnessTip: 'Tuna provides protein and can provide omega-3 fatty acids depending on the type of tuna.'
  },


  // =========================================================
  // DINNER
  // =========================================================

  {
    id: 'veg-paneer-zucchini',
    name: 'Paneer Tikka with Grilled Zucchini',
    type: 'veg',
    category: 'dinner',
    time: '25 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6f67-ZN1tQz9JkBFZwpztkjRtHyMw-_Qes8rklOUyngIo2kDqxY_U8BI&s=10',
    description: 'Spiced paneer and vegetables marinated in curd and pan-grilled.',
    ingredients: [
      'Paneer cubes',
      'Zucchini',
      'Bell peppers',
      'Curd for marinade'
    ],
    instructions: [
      'Marinate paneer and vegetables in spiced curd.',
      'Place the ingredients on skewers.',
      'Pan-grill until golden.',
      'Serve warm.'
    ],
    wellnessTip: 'Paneer provides protein while grilled vegetables add vegetables to the evening meal.'
  },

  {
    id: 'veg-lauki-bajra-roti',
    name: 'Bottle Gourd (Lauki) Sabzi with Bajra Roti',
    type: 'veg',
    category: 'dinner',
    time: '25 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://t3.ftcdn.net/jpg/08/52/25/32/360_F_852253213_K8Mmxlw9XXReiUd12FoIyWub4imm2dCY.jpg',
    description: 'Light bottle gourd sabzi served with one warm bajra roti.',
    ingredients: [
      'Bottle gourd',
      'Cumin seeds',
      'Tomatoes',
      'Bajra flour'
    ],
    instructions: [
      'Chop the bottle gourd.',
      'Cook it with cumin seeds and tomatoes.',
      'Prepare one bajra roti.',
      'Serve the cooked lauki with the warm roti.'
    ],
    wellnessTip: 'Bottle gourd is a water-rich vegetable that can be included in a balanced meal.'
  },

  {
    id: 'veg-mixed-dal-soup',
    name: 'Mixed Dal Soup with Sautéed Beans',
    type: 'veg',
    category: 'dinner',
    time: '25 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4ahEjAZ2SFiwldnHVMfKuaR1yY2KlPoB8GRJjGT_Hg&s=10/',
    description: 'Light dal soup served with green beans sautéed with garlic.',
    ingredients: [
      'Toor dal',
      'Moong dal',
      'Green beans',
      'Garlic',
      'Black pepper'
    ],
    instructions: [
      'Boil the dals until soft.',
      'Cook them into a thin soup consistency.',
      'Lightly sauté green beans with garlic.',
      'Add black pepper.',
      'Serve the beans alongside the dal soup.'
    ],
    wellnessTip: 'Lentils provide plant-based protein and fiber, while soup contributes fluid to the meal.'
  },

  {
    id: 'nonveg-chicken-broth-greens',
    name: 'Clear Chicken Bone Broth & Sautéed Greens',
    type: 'nonveg',
    category: 'dinner',
    time: '50 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://thecozycook.com/wp-content/uploads/2022/09/Chicken-Vegetable-Soup-1.jpg',
    description: 'Chicken broth served with lightly sautéed leafy greens.',
    ingredients: [
      'Bone-in chicken pieces',
      'Spinach or kale',
      'Ginger',
      'Garlic'
    ],
    instructions: [
      'Simmer chicken with ginger and garlic for about 45 minutes.',
      'Prepare the broth.',
      'Stir the greens into the broth shortly before serving.',
      'Serve warm.'
    ],
    wellnessTip: 'Chicken provides protein and leafy greens add vegetables to the meal.'
  },

  {
    id: 'nonveg-grilled-fish-sweet-potato',
    name: 'Grilled Fish with Mashed Sweet Potato',
    type: 'nonveg',
    category: 'dinner',
    time: '30 min',
    difficulty: 'Medium',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://i.ytimg.com/vi/mq4NrXi0aMc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLABvXGvvA2bB0SEduk1XHJU8aX8Xg',
    description: 'Pan-seared fish served with mashed sweet potato and lemon.',
    ingredients: [
      'Fish fillet',
      'One medium sweet potato',
      'Olive oil',
      'Lemon'
    ],
    instructions: [
      'Boil the sweet potato.',
      'Mash the cooked sweet potato.',
      'Pan-sear the fish in olive oil.',
      'Serve the fish with mashed sweet potato.',
      'Add lemon wedges.'
    ],
    wellnessTip: 'Sweet potato provides carbohydrate and fiber, while fish provides protein.'
  },

  {
    id: 'nonveg-lemon-garlic-chicken-salad',
    name: 'Lemon Garlic Chicken Salad',
    type: 'nonveg',
    category: 'dinner',
    time: '20 min',
    difficulty: 'Easy',
    calories: 'Not specified',
    protein: 'Not specified',
    image: 'https://www.heinens.com/content/uploads/2018/06/Greek-Lemon-Garlic-Chicken-Salad.jpg',
    description: 'Grilled chicken served with lettuce, cucumber, lemon, and olive oil.',
    ingredients: [
      'Grilled chicken breast',
      'Lettuce',
      'Cucumber',
      'Lemon',
      'Olive oil'
    ],
    instructions: [
      'Slice the grilled chicken.',
      'Add lettuce and cucumber.',
      'Add lemon juice.',
      'Add olive oil.',
      'Toss everything together and serve.'
    ],
    wellnessTip: 'Chicken provides protein while lettuce and cucumber add vegetables and volume to the meal.'
  }

];



// Exercise Data
const exerciseRoutines = {
  day1: [
    { id: 'ex-d1-1', name: 'Gentle Cat-Cow Mobility', duration: '10 Reps', difficulty: 'Gentle', target: 'Spine & Pelvic Floor', tip: 'Synchronize breath with movement: inhale arch, exhale round.' },
    { id: 'ex-d1-2', name: 'Supported Glute Bridges', duration: '3 Sets x 12 Reps', difficulty: 'Moderate', target: 'Glutes & Core', tip: 'Squeeze glutes at top for 2 seconds without overarching lower back.' }
  ],
  day2: [
    { id: 'ex-1', name: 'Bodyweight Box Squats', duration: '3 Sets x 12 Reps', difficulty: 'Moderate', target: 'Quads & Glutes', tip: 'Keep chest lifted and press through mid-foot and heels.' },
    { id: 'ex-2', name: 'Glute Bridge with 2s Hold', duration: '3 Sets x 12 Reps', difficulty: 'Moderate', target: 'Glute Max & Pelvic Stability', tip: 'Exhale as you lift; avoid flaring the ribcage.' }
  ]
};

// Yoga Data
const yogaRoutines = {
  day1: [
    { id: 'yg-d1-1', name: 'Marjaryasana-Bitilasana (Cat-Cow)', duration: '2 Minutes', difficulty: 'Gentle', target: 'Spinal Health', tip: 'Flow smoothly with your inhalation and exhalation.' }
  ],
  day2: [
    { id: 'yg-1', name: 'Surya Namaskar (Sun Salutation Slow Flow)', duration: '5 Cycles', difficulty: 'Energizing', target: 'Full Body Vitality', tip: 'Move intentionally through each posture without rushing.' }
  ]
};

// =========================================================================
// 1. Skincare Protocol Database (16 Combinations with Modals)
// =========================================================================
const skinProtocols = {
  oily: {
    breakouts: {
      title: "Oily Skin • Hormonal Cystic Acne & Congestion",
      diy: {
        morning: [
          {
            id: 'diy-besan-honey',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Besan & Raw Honey Paste',
            details: 'Antimicrobial wash that sweeps away excess sebum without stripping the skin mantle.',
            ingredients: ['2 tbsp Gram Flour (Besan)', '1 tbsp Pure Raw Honey', '1-2 tbsp Rose Water'],
            instructions: [
              'Combine besan and honey in a small bowl.',
              'Add rose water until a smooth, spreadable paste forms.',
              'Massage gently onto wet face in upward circular motions for 60 seconds.',
              'Rinse thoroughly with lukewarm water.'
            ],
            benefit: 'Besan absorbs deep-seated sebum while honey destroys acne bacteria.'
          },
          {
            id: 'diy-greentea-ice',
            step: '2. Tone/Prep (DIY Recipe)',
            name: 'Green Tea Ice Compress',
            details: 'Chilled antioxidant tonic that shrinks active pimples and reduces redness.',
            ingredients: ['1 Green Tea bag', '1 cup Boiling water', 'Ice tray'],
            instructions: [
              'Steep green tea for 10 minutes and cool completely.',
              'Freeze into ice cubes overnight.',
              'Wrap an ice cube in a soft cloth and glide across active breakouts for 1-2 minutes.'
            ],
            benefit: 'EGCG polyphenols calm swelling and constrict dilated capillaries.'
          }
        ],
        evening: [
          {
            id: 'diy-teatree-spot',
            step: '3. Treat (DIY Recipe)',
            name: 'Diluted Tea Tree Spot Treatment',
            details: 'Targeted botanical spot dab that kills acne bacteria deep inside blemishes.',
            ingredients: ['1 drop 100% Pure Tea Tree Oil', '5 drops Pure Aloe Vera Gel'],
            instructions: [
              'Mix tea tree oil into fresh aloe vera gel.',
              'Using a clean cotton swab, dab directly onto cysts and pimples before bed.'
            ],
            benefit: 'Delivers potent antimicrobial action without burning the skin.'
          },
          {
            id: 'diy-neem-turmeric',
            step: '4. Weekly Mask (DIY Recipe)',
            name: 'Neem & Turmeric Clarifying Pack',
            details: 'Anti-inflammatory Ayurvedic purifying mask to purge clogged follicles.',
            ingredients: ['1 tsp Wild Neem Leaf Powder', '1/4 tsp Wild Turmeric (Kasturi Manjal)', '1 tbsp Curd / Dahi'],
            instructions: [
              'Mix neem powder, turmeric, and curd into a paste.',
              'Apply evenly over face and let sit for 10-12 minutes.',
              'Rinse with cool water while massaging gently.'
            ],
            benefit: 'Neem purges bacterial congestion and restores natural pH.'
          }
        ],
        tip: 'Consistency with gentle BHA cleansing and antibacterial botanicals prevents deep hormonal jawline cysts.'
      },
      commercial: {
        morning: [
          { step: '1. Cleanse (Product)', name: '2% Salicylic Acid Face Wash', price: '₹349 / $12', need: 'Penetrates and clears clogged pore congestion.' },
          { step: '2. Tone (Product)', name: 'Alcohol-Free Witch Hazel Toner', price: '₹399 / $14', need: 'Balances skin surface pH and tightens enlarged pores.' }
        ],
        evening: [
          { step: '3. Treat (Product)', name: '10% Niacinamide + Zinc PCA Serum', price: '₹599 / $16', need: 'Regulates oil gland secretion and prevents blemish scarring.' },
          { step: '4. Weekly Mask (Product)', name: 'Kaolin & Bentonite Clay Mask', price: '₹499 / $15', need: 'Absorbs excess surface oil and purges impurities.' }
        ],
        tip: 'Salicylic acid and Niacinamide provide clinical oil control and blemish prevention.'
      }
    },
    dryness: {
      title: "Oily Skin • Dehydration & Surface Flaking",
      diy: {
        morning: [
          {
            id: 'diy-rawmilk-rose',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Raw Milk & Rosewater Splash',
            details: 'Mild lactic acid cleanse that softens flaky dead cells.',
            ingredients: ['2 tbsp Cold Raw Milk', '1 tbsp Pure Rose Water'],
            instructions: ['Mix milk and rosewater, wipe face with cotton pad, rinse after 2 minutes.'],
            benefit: 'Natural lactic acid softens flakiness while milk lipids soothe.'
          }
        ],
        evening: [
          {
            id: 'diy-yogurt-honey',
            step: '2. Repair Mask (DIY Recipe)',
            name: 'Yogurt & Honey Moisture Mask',
            details: 'Non-comedogenic barrier recovery treatment.',
            ingredients: ['1 tbsp Fresh Curd', '1 tsp Raw Honey'],
            instructions: ['Apply blend for 15 minutes and rinse with cool water.'],
            benefit: 'Restores skin surface water without pore-clogging heavy oils.'
          }
        ],
        tip: 'Flakiness on oily skin indicates barrier dehydration; prioritize water hydration over heavy oils.'
      },
      commercial: {
        morning: [
          { step: '1. Cleanse', name: 'Low-pH Amino Acid Gel Cleanser', price: '₹399', need: 'Cleanses gently while preserving lipid barrier integrity.' },
          { step: '2. Hydrate', name: 'Hyaluronic Acid 2% + B5 Serum', price: '₹649', need: 'Draws moisture deep into parched skin layers.' }
        ],
        evening: [
          { step: '3. Repair', name: 'Ceramide NP Lightweight Emulsion', price: '₹599', need: 'Repairs lipid matrix overnight.' }
        ],
        tip: 'Water-based humectants restore plumpness without triggering breakouts.'
      }
    },
    sensitivity: {
      title: "Oily Skin • Sensitivity & Post-Hair Removal Redness",
      diy: {
        morning: [
          {
            id: 'diy-cucumber-wash',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Cold Cucumber Juice Wash',
            details: 'Instant anti-inflammatory wash that cools dilated facial capillaries.',
            ingredients: ['1/2 Fresh Cucumber juiced', 'Chilled rosewater splash'],
            instructions: ['Extract juice and splash onto face; leave for 3 minutes before rinsing.'],
            benefit: 'Cools irritated follicles after waxing or threading.'
          }
        ],
        evening: [
          {
            id: 'diy-aloe-mint',
            step: '2. Treat (DIY Recipe)',
            name: 'Fresh Pure Aloe Vera Soothing Gel',
            details: 'Calms inflammation and promotes rapid epidermal healing.',
            ingredients: ['2 tbsp Pure Organic Aloe Vera Gel'],
            instructions: ['Smooth a thick layer over threaded or red areas.'],
            benefit: 'Clinically proven to accelerate micro-tear recovery.'
          }
        ],
        tip: 'Avoid hot water on face; cool splashes prevent capillary flushing.'
      },
      commercial: {
        morning: [
          { step: '1. Cleanse', name: 'Fragrance-Free Oat Cleanser', price: '₹450', need: 'Ultra-mild cleansing for reactive skin.' },
          { step: '2. Spray', name: 'Hypochlorous Acid Antimicrobial Spray', price: '₹799', need: 'Prevents bacterial infection in open follicles without stinging.' }
        ],
        evening: [
          { step: '3. Treat', name: 'Centella Asiatica (Cica) Calming Gel', price: '₹650', need: 'Rapidly heals redness and micro-irritations.' }
        ],
        tip: 'Hypochlorous acid prevents post-threading follicular pimples safely.'
      }
    },
    uneven: {
      title: "Oily Skin • Dark Patches (Acanthosis Nigricans) & Marks",
      diy: {
        morning: [
          {
            id: 'diy-oat-polish',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Raw Milk & Oat Powder Scrub',
            details: 'Gentle physical and lactic exfoliant to sweep away dead cells.',
            ingredients: ['1 tbsp Fine Oat Powder', '1.5 tbsp Raw Milk'],
            instructions: ['Massage gently for 1 minute and rinse thoroughly.'],
            benefit: 'Safely removes dull surface cells without micro-tears.'
          }
        ],
        evening: [
          {
            id: 'diy-papaya-turmeric',
            step: '2. Mask (DIY Recipe)',
            name: 'Yogurt & Papaya Enzyme Mash',
            details: 'Contains natural papain enzymes and lactic acid for gentle brightening.',
            ingredients: ['2 cubes Mashed Ripe Papaya', '1 tbsp Fresh Curd'],
            instructions: ['Apply for 15 minutes and rinse with lukewarm water.'],
            benefit: 'Fades dark patches related to insulin resistance.'
          }
        ],
        tip: 'Gentle tyrosinase inhibitors gradually restore uniform luminosity.'
      },
      commercial: {
        morning: [
          { step: '1. Tone', name: '5% Glycolic Acid Exfoliating Toner', price: '₹549', need: 'Accelerates dead skin cell shedding.' },
          { step: '2. Treat', name: 'Alpha Arbutin 2% Brightening Serum', price: '₹599', need: 'Suppresses excess melanin production in dark spots.' }
        ],
        evening: [
          { step: '3. Mask', name: 'Vitamin C & Lactic Acid Peel Mask', price: '₹699', need: 'Provides clinical resurfacing for stubborn hyperpigmentation.' }
        ],
        tip: 'Always wear broad-spectrum SPF 50; sunlight darkens active pigmentation.'
      }
    }
  },
  combination: {
    breakouts: {
      title: "Combination Skin • T-Zone Breakouts & Congestion",
      diy: {
        morning: [
          {
            id: 'diy-comb-besan-honey',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Besan & Honey Zone Wash',
            details: 'Targeted wash focusing on the oily T-zone while nourishing dry cheek areas.',
            ingredients: ['2 tbsp Gram Flour (Besan)', '1 tbsp Pure Raw Honey', '2 tbsp Rosewater'],
            instructions: [
              'Mix ingredients into a creamy emulsion.',
              'Massage onto oily forehead, nose, and chin first, then lightly over cheeks.',
              'Rinse with lukewarm water.'
            ],
            benefit: 'Deeply cleanses congested pores on the T-zone without dehydrating cheek tissue.'
          }
        ],
        evening: [
          {
            id: 'diy-zone-mask',
            step: '2. Weekly Mask (DIY Recipe)',
            name: 'Multani Mitti T-Zone + Honey Cheeks Mask',
            details: 'Multi-masking method: clay on oily areas and honey on dry areas.',
            ingredients: ['1 tbsp Multani Mitti with rosewater', '1 tbsp Raw Honey'],
            instructions: [
              'Apply Multani Mitti paste onto forehead, nose, and chin.',
              'Apply pure raw honey generously over cheeks.',
              'Leave for 10 minutes, then rinse everything off together.'
            ],
            benefit: 'Absorbs excess T-zone oil while restoring hydration to dry cheeks.'
          }
        ],
        tip: 'Zone-treat your face: never apply drying clay masks all over combination skin.'
      },
      commercial: {
        morning: [
          { step: '1. Cleanse', name: 'Low-pH Clarifying Gel Cleanser', price: '₹375', need: 'Balances T-zone sebum without over-drying or tightening cheek areas.' },
          { step: '2. Tone', name: 'Niacinamide 5% Balancing Toner', price: '₹450', need: 'Normalizes sebum flow across different facial zones.' }
        ],
        evening: [
          { step: '3. Treat', name: '2% BHA Salicylic Liquid Exfoliant', price: '₹599', need: 'Applied 3 nights a week to dissolve blackheads and T-zone pore buildup.' }
        ],
        tip: 'Apply BHA exfoliants primarily to your T-zone to prevent drying out your cheek areas.'
      }
    }
  }
};

function getSkinProtocolData(type, focus) {
  if (skinProtocols[type] && skinProtocols[type][focus]) {
    return skinProtocols[type][focus];
  }
  if (skinProtocols.oily && skinProtocols.oily[focus]) {
    return skinProtocols.oily[focus];
  }
  return skinProtocols.oily.breakouts;
}

// =========================================================================
// 2. Hair Care Recommendations Engine (16 Combinations with Modals)
// =========================================================================
const hairProtocols = {
  straight: {
    shedding: {
      title: "Straight Hair • Follicle Strengthening & Shedding Support",
      diy: {
        washDay: [
          {
            id: 'diy-reetha-shikakai-straight',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Reetha & Shikakai Herbal Scalp Wash',
            details: 'Traditional chemical-free saponin wash that gently lifts root sebum without harsh synthetic sulfates.',
            ingredients: ['5 dried Reetha (Soapnuts)', '4 dried Shikakai pods', '1 piece dried Amla', '3 cups Water'],
            instructions: [
              'Soak Reetha, Shikakai, and Amla in 3 cups of water overnight.',
              'Boil on low flame for 15 minutes in the morning, then let cool.',
              'Mash the softened pods with fingers, strain the liquid, and pour over scalp in the shower.',
              'Massage gently for 2-3 minutes to create a mild herbal lather, then rinse.'
            ],
            benefit: 'Naturally purges dead skin build-up and maintains the scalp acidic mantle.'
          },
          {
            id: 'diy-methi-mask-straight',
            step: '2. Deep Care (DIY Recipe)',
            name: 'Methi (Fenugreek) Root-Strengthening Mask',
            details: 'Potent mucilage and nicotinic acid mask that binds to hair shafts to prevent excessive breakage.',
            ingredients: ['3 tbsp Fenugreek (Methi) Seeds', '1/2 cup Water', '2 tbsp Fresh Curd'],
            instructions: [
              'Soak fenugreek seeds in water overnight until gelatinous.',
              'Blend into a smooth, creamy paste and mix in fresh curd.',
              'Section hair and apply directly onto roots and scalp.',
              'Wear a shower cap for 30 minutes, then rinse thoroughly.'
            ],
            benefit: 'Methi is rich in phytoestrogens and proteins that nourish weak follicles.'
          }
        ],
        nonWashDay: [
          {
            id: 'diy-rosemary-spray-straight',
            step: '1. Stimulate (DIY Recipe)',
            name: 'Rosemary & Amla Daily Scalp Tonic',
            details: 'Clinically proven botanical stimulant that boosts microcirculation around shrinking hair follicles.',
            ingredients: ['2 sprigs Fresh Rosemary (or 2 tbsp dried)', '1 tbsp Amla powder', '2 cups Distilled Water'],
            instructions: [
              'Boil rosemary and amla in distilled water for 15 minutes until amber-colored.',
              'Strain into a clean spray bottle and refrigerate.',
              'Spray directly onto hair partings every morning and massage for 2 minutes with fingertips.'
            ],
            benefit: 'Carnosic acid in rosemary encourages hair growth comparable to mild minoxidil.'
          },
          {
            id: 'diy-wooden-comb-straight',
            step: '2. Maintenance (DIY Practice)',
            name: 'Neem Wood Wide-Tooth Detangling',
            details: 'Static-free detangling that distributes natural scalp sebum down to dry hair tips.',
            ingredients: ['Pure Neem Wood wide-tooth comb'],
            instructions: [
              'Start detangling from the very bottom ends of hair.',
              'Slowly work upwards to roots without tugging to minimize mechanical tension.'
            ],
            benefit: 'Reduces traction stress on delicate roots.'
          }
        ],
        tip: 'Avoid tight high ponytails; straight strands have delicate root angles prone to tension loss.'
      },
      commercial: {
        washDay: [
          { step: '1. Cleanse (Product)', name: 'Sulfate-Free Biotin & Caffeine Densifying Shampoo', price: '₹499 / $16', need: 'Stimulates root microcirculation while thoroughly cleansing fine scalp buildup.' },
          { step: '2. Deep Care (Product)', name: 'Peptide-Infused Root Thickening Mask', price: '₹699 / $20', need: 'Fortifies keratin bonds in thinning hair strands.' }
        ],
        nonWashDay: [
          { step: '1. Nourish (Product)', name: '5% Redensyl + 3% Procapil Scalp Serum', price: '₹899 / $24', need: 'Activates hair follicle stem cells to shift hairs into the anagen (growth) phase.' },
          { step: '2. Scalp Tool', name: 'Silicone Scalp Massager Brush', price: '₹249', need: 'Stimulates micro-blood flow to awaken dormant follicles.' }
        ],
        tip: 'Redensyl and Capixyl provide clinical density support without the rebound shedding of synthetic treatments.'
      }
    },
    dandruff: {
      title: "Straight Hair • Oily Scalp & Flaking Dandruff",
      diy: {
        washDay: [
          {
            id: 'diy-acv-clarifying-straight',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Diluted Apple Cider Vinegar (ACV) Clarifying Rinse',
            details: 'Restores scalp pH balance to eliminate yeast overgrowth and loosen sticky dandruff scales.',
            ingredients: ['2 tbsp Raw Unfiltered ACV', '1 cup Warm Water'],
            instructions: [
              'Mix ACV with water in a cup.',
              'Pour over freshly cleansed scalp and let sit for 3 minutes before a final cool rinse.'
            ],
            benefit: 'Natural acetic acid restores optimal pH (5.5) and strips mineral buildup.'
          },
          {
            id: 'diy-teatree-oil-straight',
            step: '2. Deep Care (DIY Recipe)',
            name: 'Tea Tree & Warm Coconut Pre-Wash Oil',
            details: 'Antifungal pre-wash treatment that dissolves stubborn flakes and soothes itching.',
            ingredients: ['2 tbsp Cold-pressed Coconut Oil', '4 drops Pure Tea Tree Essential Oil'],
            instructions: [
              'Warm the coconut oil slightly and stir in tea tree drops.',
              'Section hair and massage gently into scalp 30 minutes before shampooing.'
            ],
            benefit: 'Terpinen-4-ol in tea tree destroys the Malassezia yeast responsible for dandruff.'
          }
        ],
        nonWashDay: [
          {
            id: 'diy-neem-scalp-mist-straight',
            step: '1. Nourish (DIY Recipe)',
            name: 'Neem Leaf Scalp Calming Mist',
            details: 'Botanical antifungal spritz that keeps the scalp clean, cool, and itch-free between wash days.',
            ingredients: ['15 Fresh Neem leaves', '2 cups Water'],
            instructions: [
              'Boil neem leaves in water for 10 minutes until green.',
              'Cool, strain into a spray bottle, and mist onto scalp roots daily.'
            ],
            benefit: 'Nimbidin and nimbin in neem inhibit fungal growth without drying the hair shaft.'
          }
        ],
        tip: 'Never leave wet hair tied up; moisture trapped against the scalp accelerates fungal flaking.'
      },
      commercial: {
        washDay: [
          { step: '1. Cleanse (Product)', name: '2% Ketoconazole Therapeutic Scalp Wash', price: '₹320', need: 'Medical standard antifungal that halts dandruff yeast and blocks androgen receptors.' },
          { step: '2. Exfoliant (Product)', name: 'Salicylic Acid (BHA) Pre-Wash Scalp Scrub', price: '₹599', need: 'Chemical and physical exfoliation to dissolve stubborn oily crusts.' }
        ],
        nonWashDay: [
          { step: '1. Nourish (Product)', name: 'Zinc Pyrithione Soothing Scalp Serum', price: '₹549', need: 'Maintains continuous antifungal defense and eliminates midday itching.' }
        ],
        tip: 'Leave Ketoconazole shampoo on your scalp for a full 3-5 minutes before rinsing for active absorption.'
      }
    }
  },
  wavy: {
    shedding: {
      title: "Wavy Hair • Density Boost & Root Strengthening",
      diy: {
        washDay: [
          {
            id: 'diy-reetha-shikakai-wavy',
            step: '1. Cleanse (DIY Recipe)',
            name: 'Amla, Reetha & Shikakai Botanical Wash',
            details: 'Purges heavy product buildup from roots without breaking natural wave clump formation.',
            ingredients: ['4 Reetha pods', '4 Shikakai pods', '1 tbsp Amla powder', '3 cups Water'],
            instructions: [
              'Boil pods in water for 15 minutes, cool, and strain.',
              'Pour onto scalp and massage roots gently, then rinse.'
            ],
            benefit: 'Tannins in amla strengthen hair roots and enhance wave definition.'
          },
          {
            id: 'diy-methi-wavy-mask',
            step: '2. Deep Care (DIY Recipe)',
            name: 'Fenugreek & Aloe Wave Strength Mask',
            details: 'Delivers plant proteins that boost tensile elasticity in wavy strands.',
            ingredients: ['3 tbsp Soaked Fenugreek Seeds', '2 tbsp Pure Aloe Gel'],
            instructions: [
              'Blend into a smooth paste and apply from roots to ends for 30 minutes before washing.'
            ],
            benefit: 'Combines mucilage slip with follicle-fortifying amino acids.'
          }
        ],
        nonWashDay: [
          {
            id: 'diy-rosemary-wavy-tonic',
            step: '1. Stimulate (DIY Recipe)',
            name: 'Rosemary & Mint Wave Refresh Tonic',
            details: 'Stimulates root circulation while reviving bouncy wave definition.',
            ingredients: ['2 sprigs Rosemary', '1 cup Water', '1 drop Argan Oil'],
            instructions: [
              'Brew rosemary tea, cool, add argan oil, and mist on scalp and waves daily.'
            ],
            benefit: 'Boosts follicle cellular activity and reduces seasonal shedding.'
          }
        ],
        tip: 'Never dry brush wavy hair when dry; only detangle with conditioner in the shower.'
      },
      commercial: {
        washDay: [
          { step: '1. Cleanse (Product)', name: 'Sulfate-Free Fortifying Shampoo for Waves', price: '₹499', need: 'Gently clarifies roots without flattening natural wave curl clumps.' },
          { step: '2. Deep Care (Product)', name: 'Peptide & Biotin Restorative Hair Mask', price: '₹699', need: 'Fortifies the hair cortex to withstand daily shedding pressure.' }
        ],
        nonWashDay: [
          { step: '1. Nourish (Product)', name: 'Redensyl & Anagain Follicle Activator Serum', price: '₹899', need: 'Encourages new growth cycles in thinning areas.' }
        ],
        tip: 'Plop your wet waves in a microfiber towel for 15 minutes to reduce root tension.'
      }
    }
  }
};

function getHairProtocolData(type, concern) {
  if (hairProtocols[type] && hairProtocols[type][concern]) {
    return hairProtocols[type][concern];
  }
  if (hairProtocols.straight && hairProtocols.straight[concern]) {
    return hairProtocols.straight[concern];
  }
  return hairProtocols.straight.shedding;
}

// =========================================================================
// 3. Dynamic Greeting & Onboarding Cycle Prediction Engine
// =========================================================================
function updateDynamicGreeting() {
  const greetingEl = document.getElementById('dashboard-greeting-title');
  const nameDisplays = document.querySelectorAll('.user-name-display');
  const initialDisplays = document.querySelectorAll('.user-initial-display');
  const emailDisplay = document.getElementById('settings-email-display');

  const userName = localStorage.getItem('pmos_user_name') || 'Nishita';
  const userEmail = localStorage.getItem('pmos_user_email') || 'nishita@example.com';

  nameDisplays.forEach(el => el.textContent = userName);
  initialDisplays.forEach(el => el.textContent = userName.charAt(0).toUpperCase());
  if (emailDisplay) emailDisplay.textContent = userEmail;

  if (greetingEl) {
    const hour = new Date().getHours();
    let timeGreeting = 'Good evening';
    if (hour >= 5 && hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon';
    }
    greetingEl.innerHTML = `${timeGreeting}, ${userName} <span class="text-peach-500">✨</span>`;
  }
}

function setupOnboardingFlow() {
  const modal = document.getElementById('onboarding-modal');
  const form = document.getElementById('onboarding-form');
  const savedUser = localStorage.getItem('pmos_user_name');

  // Trigger login modal if user hasn't onboarded yet
  if (!savedUser && modal) {
    modal.classList.remove('hidden');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name-input').value.trim();
      const email = document.getElementById('user-email-input').value.trim();
      const lastDate = document.getElementById('last-period-date').value;
      const prevDate = document.getElementById('prev-period-date').value;
      const delayDays = parseInt(document.getElementById('cycle-delay-select').value, 10) || 0;
      const goal = document.getElementById('primary-goal-select').value;

      // Reset checklist for new user (0% initial state)
      state.dashboardChecklist = { move: false, nourish: false, selfcare: false, mood: false };
      state.exerciseCompleted = {};
      state.yogaCompleted = {};
      state.selectedMood = null;

      localStorage.setItem('pmos_user_name', name);
      localStorage.setItem('pmos_user_email', email);
      localStorage.setItem('pmos_last_period', lastDate);
      localStorage.setItem('pmos_prev_period', prevDate);
      localStorage.setItem('pmos_cycle_delay', delayDays.toString());
      localStorage.setItem('pmos_primary_goal', goal);
      localStorage.setItem('pmos_streak', '1');

      modal.classList.add('hidden');
      syncChecklistCheckboxes();
      updateDashboardProgress();
      calculateAndRenderCyclePrediction();
      updateDynamicGreeting();
      showToast(`Welcome, ${name}!`, 'Your personalized cycle rhythm and dashboard are active.', 'sparkles');
    });
  }

  syncChecklistCheckboxes();
  updateDashboardProgress();
  calculateAndRenderCyclePrediction();
  updateDynamicGreeting();
}

function calculateAndRenderCyclePrediction() {
  const lastPeriodStr = localStorage.getItem('pmos_last_period');
  const prevPeriodStr = localStorage.getItem('pmos_prev_period');
  const delayDays = parseInt(localStorage.getItem('pmos_cycle_delay') || '0', 10);

  let baselineCycle = 28;
  const today = new Date();
  let lastDate = lastPeriodStr ? new Date(lastPeriodStr) : new Date(today.getTime() - (1 * 24 * 60 * 60 * 1000));

  if (lastPeriodStr && prevPeriodStr) {
    const prevDate = new Date(prevPeriodStr);
    const diffDays = Math.ceil(Math.abs(lastDate - prevDate) / (1000 * 60 * 60 * 24));
    if (diffDays >= 20 && diffDays <= 120) {
      baselineCycle = diffDays;
    }
  }

  const estimatedCycleLength = baselineCycle + (delayDays > 0 ? Math.round(delayDays * 0.5) : 0);
  const elapsedDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24)) + 1;
  const currentCycleDay = elapsedDays > 0 ? elapsedDays : 1;

  const predictedNext = new Date(lastDate);
  predictedNext.setDate(predictedNext.getDate() + estimatedCycleLength);

  let phaseName = 'Follicular Phase';
  if (currentCycleDay <= 5) {
    phaseName = 'Menstrual Phase';
  } else if (currentCycleDay <= 12) {
    phaseName = 'Follicular Phase';
  } else if (currentCycleDay <= 16) {
    phaseName = 'Ovulatory Phase';
  } else {
    phaseName = 'Luteal Phase';
  }

  document.querySelectorAll('.cycle-day-indicator').forEach(el => {
    el.innerHTML = `Cycle Day ${currentCycleDay} • <span class="uppercase font-bold">${phaseName}</span>`;
  });

  const nextPeriodDisplay = document.getElementById('predicted-period-date');
  if (nextPeriodDisplay) {
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    nextPeriodDisplay.textContent = predictedNext.toLocaleDateString('en-US', dateOptions);
  }
}

window.resetUserProfile = function () {
  localStorage.clear();
  state.dashboardChecklist = { move: false, nourish: false, selfcare: false, mood: false };
  state.selectedMood = null;
  const modal = document.getElementById('onboarding-modal');
  if (modal) modal.classList.remove('hidden');
  syncChecklistCheckboxes();
  updateDashboardProgress();
  showToast('Reset Complete', 'Please register as a new user.', 'refresh-cw');
};

// =========================================================================
// 4. Navigation & App Bootstrap
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  setupNavigation();
  setupOnboardingFlow();
  setupDashboardInteractions();
  setupNutritionSection();
  setupRoutinesSection();
  setupPersonalCareSection();
  setupMedicationTracker();
  setupProgressJourney();
  setupModalsAndToasts();
  renderCurrentDate();
});

function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function renderCurrentDate() {
  const dateEls = document.querySelectorAll('.dynamic-date');
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', options);
  dateEls.forEach(el => el.textContent = dateString);
}

function setupNavigation() {
  const navButtons = document.querySelectorAll('[data-nav-target]');
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = btn.getAttribute('data-nav-target');
      const targetSubtab = btn.getAttribute('data-subtab-target') || 'skin';
      showSection(targetSection, targetSubtab);
    });
  });
}

function showSection(sectionId, subtabId = 'skin') {
  state.activeSection = sectionId;

  document.querySelectorAll('.app-section').forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('active');
  });

  const activeSec = document.getElementById(`section-${sectionId}`);
  if (activeSec) {
    activeSec.classList.remove('hidden');
    activeSec.classList.add('active');
  }

  document.querySelectorAll('.sidebar-nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-nav-target') === sectionId;
    if (isTarget) {
      btn.classList.add('bg-blush', 'text-charcoal-900', 'font-semibold', 'shadow-sm');
      btn.classList.remove('text-charcoal-600', 'hover:bg-cream-100');
    } else {
      btn.classList.remove('bg-blush', 'text-charcoal-900', 'font-semibold', 'shadow-sm');
      btn.classList.add('text-charcoal-600', 'hover:bg-cream-100');
    }
  });

  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-nav-target') === sectionId;
    if (isTarget) {
      btn.classList.add('text-peach-600', 'font-bold');
      btn.classList.remove('text-charcoal-400');
    } else {
      btn.classList.remove('text-peach-600', 'font-bold');
      btn.classList.add('text-charcoal-400');
    }
  });

  if (sectionId === 'care') {
    switchCareSubtab(subtabId || 'skin');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  initLucideIcons();
}

// =========================================================================
// 5. Personal Care Section Logic (Skincare & Haircare)
// =========================================================================
function setupPersonalCareSection() {
  const careTabs = document.querySelectorAll('.care-subnav-btn');
  careTabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const subtab = btn.getAttribute('data-care-tab');
      switchCareSubtab(subtab);
    });
  });

  setupSelectionChips('skin-type-chip', (val) => state.skinType = val);
  setupSelectionChips('skin-focus-chip', (val) => state.skinFocus = val);

  const skinGenBtn = document.getElementById('generate-skin-routine-btn');
  if (skinGenBtn) {
    skinGenBtn.addEventListener('click', generateSkinRoutine);
  }

  setupSelectionChips('hair-type-chip', (val) => state.hairType = val);
  setupSelectionChips('hair-concern-chip', (val) => state.hairConcern = val);

  const hairGenBtn = document.getElementById('generate-hair-routine-btn');
  if (hairGenBtn) {
    hairGenBtn.addEventListener('click', generateHairRoutine);
  }

  const careMoodBtns = document.querySelectorAll('.care-mood-btn');
  careMoodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      careMoodBtns.forEach(b => b.classList.remove('ring-2', 'ring-peach-500', 'bg-peach-100', 'scale-110'));
      btn.classList.add('ring-2', 'ring-peach-500', 'bg-peach-100', 'scale-110');

      const moodVal = btn.getAttribute('data-mood');
      state.selectedMood = moodVal;
      state.dashboardChecklist.mood = true;
      syncChecklistCheckboxes();
      updateDashboardProgress();

      const resEl = document.getElementById('care-mood-response');
      if (resEl) {
        resEl.classList.remove('hidden');
        resEl.innerHTML = `
          <div class="bg-blush/80 border border-blush-dark p-4 rounded-2xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🌷</span>
              <div>
                <p class="text-xs font-bold text-charcoal-900">Thanks for checking in today!</p>
                <p class="text-xs text-charcoal-600 mt-0.5">Your feelings are valid. Here are soothing activities tailored for you:</p>
              </div>
            </div>
            <span class="text-xs font-semibold text-sage-600 bg-white px-2.5 py-1 rounded-full border border-sage-200">Logged ✓</span>
          </div>
        `;
      }
      showToast('Mood Recorded', 'Thanks for tuning in with yourself today 🌷', 'heart');
    });
  });

  const breathToggleBtn = document.getElementById('breathing-guide-toggle');
  if (breathToggleBtn) {
    breathToggleBtn.addEventListener('click', toggleBreathingExercise);
  }

  const saveJournalBtn = document.getElementById('save-journal-btn');
  const journalInput = document.getElementById('journal-note-input');
  if (saveJournalBtn && journalInput) {
    saveJournalBtn.addEventListener('click', () => {
      const text = journalInput.value.trim();
      if (!text) {
        showToast('Empty Note', 'Please write a brief reflection before saving.', 'alert-circle');
        return;
      }
      state.journalEntries.unshift({
        id: Date.now(),
        text: text,
        time: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      journalInput.value = '';
      renderJournalList();
      showToast('Reflection Saved', 'Your gratitude note has been saved.', 'book-open');
    });
  }
  renderJournalList();

  const symptomBtns = document.querySelectorAll('.period-symptom-btn');
  symptomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const symptom = btn.getAttribute('data-symptom');
      if (state.loggedSymptoms.has(symptom)) {
        state.loggedSymptoms.delete(symptom);
        btn.classList.remove('bg-peach-500', 'text-white', 'border-peach-500', 'shadow-sm');
        btn.classList.add('bg-white', 'text-charcoal-700');
      } else {
        state.loggedSymptoms.add(symptom);
        btn.classList.add('bg-peach-500', 'text-white', 'border-peach-500', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-charcoal-700');
        showToast('Symptom Logged', `Recorded ${symptom} for today.`, 'calendar');
      }
    });
  });
}

function switchCareSubtab(subtabId) {
  state.activeCareSubtab = subtabId;

  document.querySelectorAll('.care-subnav-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-care-tab') === subtabId;
    if (isTarget) {
      btn.classList.add('bg-peach-500', 'text-white', 'shadow-sm', 'font-bold');
      btn.classList.remove('bg-white', 'text-charcoal-700');
    } else {
      btn.classList.remove('bg-peach-500', 'text-white', 'shadow-sm', 'font-bold');
      btn.classList.add('bg-white', 'text-charcoal-700');
    }
  });

  document.querySelectorAll('.care-view-pane').forEach(pane => {
    pane.classList.add('hidden');
  });

  const targetPane = document.getElementById(`care-view-${subtabId}`);
  if (targetPane) {
    targetPane.classList.remove('hidden');
  }

  initLucideIcons();
}

function setupSelectionChips(className, onSelect) {
  const chips = document.querySelectorAll(`.${className}`);
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => {
        c.classList.remove('border-peach-500', 'bg-peach-50', 'text-peach-700', 'font-bold', 'ring-2', 'ring-peach-400');
        c.classList.add('border-cream-200', 'bg-white', 'text-charcoal-700');
      });
      chip.classList.add('border-peach-500', 'bg-peach-50', 'text-peach-700', 'font-bold', 'ring-2', 'ring-peach-400');
      chip.classList.remove('border-cream-200', 'bg-white', 'text-charcoal-700');

      const val = chip.getAttribute('data-value');
      onSelect(val);
    });
  });
}

// ----------------------------------------------------
// Skincare UI Builder & Switcher
// ----------------------------------------------------
function generateSkinRoutine() {
  const container = document.getElementById('skin-routine-result');
  if (!container) return;

  const routineData = getSkinProtocolData(state.skinType, state.skinFocus);

  container.innerHTML = `
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-blush-dark/50 shadow-card space-y-6 animate-soft-pulse">
      <div class="flex items-center justify-between flex-wrap gap-3 border-b border-cream-200 pb-4">
        <div>
          <span class="text-xs font-bold text-peach-600 uppercase tracking-wider">Your Custom PMOS Routine</span>
          <h3 class="text-xl font-bold font-serif text-charcoal-900 mt-1 capitalize">${routineData.title}</h3>
        </div>

        <div class="flex items-center gap-3">
          <div class="inline-flex p-1 rounded-2xl bg-cream-200/80 border border-cream-300">
            <button id="toggle-diy-btn" onclick="switchSkinMode('diy')" class="px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all">
              🌿 DIY Recipes
            </button>
            <button id="toggle-comm-btn" onclick="switchSkinMode('commercial')" class="px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all">
              🛒 Commercial Products
            </button>
          </div>

          <button onclick="saveSkinRoutine()" class="px-4 py-2 bg-blush text-peach-700 hover:bg-peach-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
            <i data-lucide="bookmark-check" class="w-4 h-4"></i> Save Routine
          </button>
        </div>
      </div>

      <div id="skin-mode-content-body">
        ${renderSkinModeCards(routineData.diy, 'DIY Botanical Recipes', true)}
      </div>

      <div class="bg-blush/60 p-4 rounded-2xl border border-blush-dark/50">
        <p class="text-xs text-charcoal-700 font-medium">💡 <strong>PMOS Tip:</strong> ${routineData.diy?.tip || routineData.commercial?.tip || 'Consistency over 6-8 weeks yields the best cellular turnover.'}</p>
        <p class="text-[11px] text-charcoal-400 mt-2 italic">"General wellness and cosmetic guidance. Consult a qualified professional for medical concerns."</p>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
  initLucideIcons();
  showToast('Routine Created!', 'Click any DIY item to view recipe instructions.', 'sparkles');
}

function renderSkinModeCards(modeData, modeTitle, isDiy = false) {
  const morningList = modeData?.morning || [];
  const eveningList = modeData?.evening || [];

  return `
    <div class="space-y-6">
      <div class="inline-block px-3 py-1 rounded-full bg-peach-100 text-peach-700 font-bold text-xs">
        Active Mode: ${modeTitle} ${isDiy ? '(Tap any recipe card for instructions)' : ''}
      </div>

      <div>
        <div class="flex items-center gap-2 text-sm font-bold text-amber-600 mb-3">
          <span>☀️</span> Morning Routine (Protect & Hydrate)
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${morningList.map(item => `
            <div class="bg-cream-50 p-4 rounded-2xl border border-cream-200 space-y-2.5 hover:border-peach-300 transition-all flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-peach-600">${item.step}</span>
                <h5 class="text-xs font-bold text-charcoal-900 mt-0.5">${item.name}</h5>
                <p class="text-xs text-charcoal-600 mt-1 leading-relaxed">${item.details || item.need || ''}</p>
                ${item.price ? `<p class="text-[11px] font-bold text-emerald-600 mt-1.5">Price / Purpose: ${item.price} — ${item.need}</p>` : ''}
              </div>

              ${isDiy && item.instructions ? `
                <div class="pt-2 border-t border-cream-200">
                  <button onclick="openDiyModal('${item.id}')" class="w-full py-2 px-3 rounded-xl bg-white hover:bg-peach-50 border border-peach-200 text-peach-700 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="book-open" class="w-3.5 h-3.5 text-peach-500"></i>
                    <span>View DIY Recipe Steps</span>
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 text-sm font-bold text-lavender-700 mb-3">
          <span>🌙</span> Evening Routine (Repair & Restore)
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${eveningList.map(item => `
            <div class="bg-cream-50 p-4 rounded-2xl border border-cream-200 space-y-2.5 hover:border-peach-300 transition-all flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-lavender-700">${item.step}</span>
                <h5 class="text-xs font-bold text-charcoal-900 mt-0.5">${item.name}</h5>
                <p class="text-xs text-charcoal-600 mt-1 leading-relaxed">${item.details || item.need || ''}</p>
                ${item.price ? `<p class="text-[11px] font-bold text-emerald-600 mt-1.5">Price / Purpose: ${item.price} — ${item.need}</p>` : ''}
              </div>

              ${isDiy && item.instructions ? `
                <div class="pt-2 border-t border-cream-200">
                  <button onclick="openDiyModal('${item.id}')" class="w-full py-2 px-3 rounded-xl bg-white hover:bg-peach-50 border border-peach-200 text-peach-700 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="book-open" class="w-3.5 h-3.5 text-peach-500"></i>
                    <span>View DIY Recipe Steps</span>
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

window.switchSkinMode = function (mode) {
  const routineData = getSkinProtocolData(state.skinType, state.skinFocus);
  const bodyContainer = document.getElementById('skin-mode-content-body');
  const diyBtn = document.getElementById('toggle-diy-btn');
  const commBtn = document.getElementById('toggle-comm-btn');

  if (!bodyContainer) return;

  if (mode === 'diy') {
    bodyContainer.innerHTML = renderSkinModeCards(routineData.diy, 'DIY Botanical Recipes', true);
    if (diyBtn) diyBtn.className = "px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all";
    if (commBtn) commBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all";
  } else {
    bodyContainer.innerHTML = renderSkinModeCards(routineData.commercial, 'Commercial Products', false);
    if (commBtn) commBtn.className = "px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all";
    if (diyBtn) diyBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all";
  }
  initLucideIcons();
};

window.openDiyModal = function (diyId) {
  const routineData = getSkinProtocolData(state.skinType, state.skinFocus);
  const allDiy = [...(routineData.diy?.morning || []), ...(routineData.diy?.evening || [])];
  const item = allDiy.find(d => d.id === diyId);

  if (!item) return;

  const modal = document.getElementById('recipe-modal');
  const modalContent = document.getElementById('recipe-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-gradient-to-r from-blush via-cream-100 to-peach-100 p-6 md:p-8 rounded-t-3xl border-b border-cream-200">
      <button onclick="closeRecipeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-charcoal-800 flex items-center justify-center transition-transform hover:scale-105 shadow-md">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-peach-500 text-white mb-2">
        🌿 DIY BOTANICAL RECIPE
      </span>
      <h2 class="text-xl md:text-2xl font-bold font-serif text-charcoal-900">${item.name}</h2>
      <p class="text-xs text-charcoal-600 mt-1">${item.details}</p>
    </div>

    <div class="p-6 md:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
      <div class="bg-blush/60 border border-blush-dark/60 p-4 rounded-2xl flex items-start gap-3">
        <span class="text-xl">✨</span>
        <div>
          <h4 class="text-xs font-bold text-charcoal-900 uppercase tracking-wide">Primary Skin Benefit</h4>
          <p class="text-xs text-charcoal-700 mt-1 leading-relaxed">${item.benefit}</p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3 flex items-center justify-between">
          <span>Ingredients Required</span>
          <span class="text-xs font-normal text-charcoal-400">Kitchen & botanical items</span>
        </h4>
        <div class="space-y-2">
          ${item.ingredients.map(ing => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-cream-50 border border-cream-200 cursor-pointer transition-colors">
              <input type="checkbox" class="w-4 h-4 rounded text-peach-500 focus:ring-peach-400 border-charcoal-300" />
              <span class="text-xs md:text-sm text-charcoal-700">${ing}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3">Step-by-Step Instructions</h4>
        <div class="space-y-3.5">
          ${item.instructions.map((step, idx) => `
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-peach-100 text-peach-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
              <p class="text-xs md:text-sm text-charcoal-700 leading-relaxed">${step}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-cream-200 flex items-center justify-end gap-3">
        <button onclick="closeRecipeModal()" class="px-5 py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold shadow-sm transition-colors">
          Got It, Done!
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initLucideIcons();
};

window.saveSkinRoutine = function () {
  showToast('Saved to Profile', 'Skin routine saved to your daily self-care checklist.', 'check-circle');
};

// ----------------------------------------------------
// Haircare UI Builder & Switcher
// ----------------------------------------------------
function generateHairRoutine() {
  const container = document.getElementById('hair-routine-result');
  if (!container) return;

  const routineData = getHairProtocolData(state.hairType, state.hairConcern);

  container.innerHTML = `
    <div class="bg-white rounded-3xl p-6 md:p-8 border border-blush-dark/50 shadow-card space-y-6 animate-soft-pulse">
      <div class="flex items-center justify-between flex-wrap gap-3 border-b border-cream-200 pb-4">
        <div>
          <span class="text-xs font-bold text-peach-600 uppercase tracking-wider">Your Custom PMOS Routine</span>
          <h3 class="text-xl font-bold font-serif text-charcoal-900 mt-1 capitalize">${routineData.title}</h3>
        </div>

        <div class="flex items-center gap-3">
          <div class="inline-flex p-1 rounded-2xl bg-cream-200/80 border border-cream-300">
            <button id="toggle-hair-diy-btn" onclick="switchHairMode('diy')" class="px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all">
              🌿 DIY Remedies
            </button>
            <button id="toggle-hair-comm-btn" onclick="switchHairMode('commercial')" class="px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all">
              🛒 Commercial Products
            </button>
          </div>

          <button onclick="saveHairRoutine()" class="px-4 py-2 bg-blush text-peach-700 hover:bg-peach-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors">
            <i data-lucide="bookmark-check" class="w-4 h-4"></i> Save Routine
          </button>
        </div>
      </div>

      <div id="hair-mode-content-body">
        ${renderHairModeCards(routineData.diy, 'DIY Botanical Remedies', true)}
      </div>

      <div class="bg-lavender-50 p-4 rounded-2xl border border-lavender-200">
        <p class="text-xs text-charcoal-700 font-medium">💡 <strong>Scalp Tip:</strong> ${routineData.diy?.tip || routineData.commercial?.tip || 'Scalp health directly dictates hair follicle longevity.'}</p>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
  initLucideIcons();
  showToast('Routine Created!', 'Click any DIY remedy to view preparation steps.', 'sparkles');
}

function renderHairModeCards(modeData, modeTitle, isDiy = false) {
  const washList = modeData?.washDay || [];
  const nonWashList = modeData?.nonWashDay || [];

  return `
    <div class="space-y-6">
      <div class="inline-block px-3 py-1 rounded-full bg-peach-100 text-peach-700 font-bold text-xs">
        Active Mode: ${modeTitle} ${isDiy ? '(Tap any remedy card for recipe)' : ''}
      </div>

      <div>
        <div class="flex items-center gap-2 text-sm font-bold text-peach-600 mb-3">
          <span>🚿</span> WASH DAY (1-2x Weekly Protocol)
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          ${washList.map(item => `
            <div class="bg-cream-50 p-4 rounded-2xl border border-cream-200 space-y-2.5 hover:border-peach-300 transition-all flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-peach-600">${item.step}</span>
                <h5 class="text-xs font-bold text-charcoal-900 mt-0.5">${item.name}</h5>
                <p class="text-xs text-charcoal-600 mt-1 leading-relaxed">${item.details || item.need || item.desc || ''}</p>
                ${item.price ? `<p class="text-[11px] font-bold text-emerald-600 mt-1.5">Price / Purpose: ${item.price} — ${item.need}</p>` : ''}
              </div>

              ${isDiy && item.instructions ? `
                <div class="pt-2 border-t border-cream-200">
                  <button onclick="openHairDiyModal('${item.id}')" class="w-full py-2 px-3 rounded-xl bg-white hover:bg-peach-50 border border-peach-200 text-peach-700 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="book-open" class="w-3.5 h-3.5 text-peach-500"></i>
                    <span>View Recipe Steps</span>
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 text-sm font-bold text-lavender-700 mb-3">
          <span>🌿</span> NON-WASH DAY (Daily Scalp Maintenance)
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${nonWashList.map(item => `
            <div class="bg-cream-50 p-4 rounded-2xl border border-cream-200 space-y-2.5 hover:border-peach-300 transition-all flex flex-col justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-lavender-700">${item.step}</span>
                <h5 class="text-xs font-bold text-charcoal-900 mt-0.5">${item.name}</h5>
                <p class="text-xs text-charcoal-600 mt-1 leading-relaxed">${item.details || item.need || item.desc || ''}</p>
                ${item.price ? `<p class="text-[11px] font-bold text-emerald-600 mt-1.5">Price / Purpose: ${item.price} — ${item.need}</p>` : ''}
              </div>

              ${isDiy && item.instructions ? `
                <div class="pt-2 border-t border-cream-200">
                  <button onclick="openHairDiyModal('${item.id}')" class="w-full py-2 px-3 rounded-xl bg-white hover:bg-peach-50 border border-peach-200 text-peach-700 font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                    <i data-lucide="book-open" class="w-3.5 h-3.5 text-peach-500"></i>
                    <span>View Recipe Steps</span>
                  </button>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

window.switchHairMode = function (mode) {
  const routineData = getHairProtocolData(state.hairType, state.hairConcern);
  const bodyContainer = document.getElementById('hair-mode-content-body');
  const diyBtn = document.getElementById('toggle-hair-diy-btn');
  const commBtn = document.getElementById('toggle-hair-comm-btn');

  if (!bodyContainer) return;

  if (mode === 'diy') {
    bodyContainer.innerHTML = renderHairModeCards(routineData.diy, 'DIY Botanical Remedies', true);
    if (diyBtn) diyBtn.className = "px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all";
    if (commBtn) commBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all";
  } else {
    bodyContainer.innerHTML = renderHairModeCards(routineData.commercial, 'Commercial Products', false);
    if (commBtn) commBtn.className = "px-4 py-1.5 rounded-xl text-xs font-bold bg-peach-500 text-white shadow-sm transition-all";
    if (diyBtn) diyBtn.className = "px-4 py-1.5 rounded-xl text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-all";
  }
  initLucideIcons();
};

window.openHairDiyModal = function (diyId) {
  const routineData = getHairProtocolData(state.hairType, state.hairConcern);
  const allDiy = [...(routineData.diy?.washDay || []), ...(routineData.diy?.nonWashDay || [])];
  const item = allDiy.find(d => d.id === diyId);

  if (!item) return;

  const modal = document.getElementById('recipe-modal');
  const modalContent = document.getElementById('recipe-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-gradient-to-r from-blush via-cream-100 to-peach-100 p-6 md:p-8 rounded-t-3xl border-b border-cream-200">
      <button onclick="closeRecipeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-charcoal-800 flex items-center justify-center transition-transform hover:scale-105 shadow-md">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-peach-500 text-white mb-2">
        🌿 AYURVEDIC HAIR REMEDY
      </span>
      <h2 class="text-xl md:text-2xl font-bold font-serif text-charcoal-900">${item.name}</h2>
      <p class="text-xs text-charcoal-600 mt-1">${item.details}</p>
    </div>

    <div class="p-6 md:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
      <div class="bg-blush/60 border border-blush-dark/60 p-4 rounded-2xl flex items-start gap-3">
        <span class="text-xl">✨</span>
        <div>
          <h4 class="text-xs font-bold text-charcoal-900 uppercase tracking-wide">Primary Hair & Scalp Benefit</h4>
          <p class="text-xs text-charcoal-700 mt-1 leading-relaxed">${item.benefit}</p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3 flex items-center justify-between">
          <span>Ingredients Required</span>
          <span class="text-xs font-normal text-charcoal-400">Natural herbs & pantry items</span>
        </h4>
        <div class="space-y-2">
          ${item.ingredients.map(ing => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-cream-50 border border-cream-200 cursor-pointer transition-colors">
              <input type="checkbox" class="w-4 h-4 rounded text-peach-500 focus:ring-peach-400 border-charcoal-300" />
              <span class="text-xs md:text-sm text-charcoal-700">${ing}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3">Step-by-Step Preparation & Application</h4>
        <div class="space-y-3.5">
          ${item.instructions.map((step, idx) => `
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-peach-100 text-peach-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
              <p class="text-xs md:text-sm text-charcoal-700 leading-relaxed">${step}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-cream-200 flex items-center justify-end gap-3">
        <button onclick="closeRecipeModal()" class="px-5 py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold shadow-sm transition-colors">
          Got It, Done!
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initLucideIcons();
};

window.saveHairRoutine = function () {
  showToast('Saved to Profile', 'Hair protocol saved to your personal care guide.', 'check-circle');
};

// =========================================================================
// 6. Dashboard Interactions & Checklist (Dynamic 25% Calculations)
// =========================================================================
function setupDashboardInteractions() {
  const moodBtns = document.querySelectorAll('.dashboard-mood-btn');
  const moodMsg = document.getElementById('dashboard-mood-msg');

  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('ring-2', 'ring-peach-500', 'bg-peach-100', 'scale-110'));
      btn.classList.add('ring-2', 'ring-peach-500', 'bg-peach-100', 'scale-110');

      const moodValue = btn.getAttribute('data-mood');
      state.selectedMood = moodValue;
      state.dashboardChecklist.mood = true;
      syncChecklistCheckboxes();
      updateDashboardProgress();

      if (moodMsg) {
        moodMsg.classList.remove('hidden');
        moodMsg.innerHTML = `<span class="inline-flex items-center gap-1.5 text-sage-600 font-medium text-xs"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Thanks for checking in 🌷 Mood logged for today.</span>`;
        initLucideIcons();
      }

      showToast('Mood Logged', 'Your daily mood check-in has been recorded.', 'smile');
    });
  });

  document.querySelectorAll('[data-quick-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-quick-action');
      if (action === 'start-routine') {
        showSection('routines');
      } else if (action === 'view-meals') {
        showSection('nutrition');
      } else if (action === 'self-care') {
        showSection('care', 'skin');
      } else if (action === 'mood-checkin') {
        showSection('care', 'mood');
      } else if (action === 'med-tracker') {
        showSection('medication');
      } else if (action === 'my-progress') {
        showSection('progress');
      }
    });
  });

  const planMoveBtn = document.getElementById('plan-move-btn');
  if (planMoveBtn) {
    planMoveBtn.addEventListener('click', () => showSection('routines'));
  }

  const planRecipeBtn = document.getElementById('plan-recipe-btn');
  if (planRecipeBtn) {
    planRecipeBtn.addEventListener('click', () => {
      openRecipeModal('moong-chilla');
    });
  }

  const planSelfCareBtn = document.getElementById('plan-selfcare-btn');
  if (planSelfCareBtn) {
    planSelfCareBtn.addEventListener('click', () => showSection('care', 'skin'));
  }

  const checklistItems = document.querySelectorAll('.dashboard-checklist-item');
  checklistItems.forEach(item => {
    const checkKey = item.getAttribute('data-checklist-key');
    const checkbox = item.querySelector('input[type="checkbox"]');

    if (checkbox && checkKey) {
      checkbox.checked = state.dashboardChecklist[checkKey] || false;
      checkbox.addEventListener('change', () => {
        state.dashboardChecklist[checkKey] = checkbox.checked;
        updateDashboardProgress();
        if (checkbox.checked) {
          showToast('Completed (+25%)', `Marked ${checkKey} complete for today!`, 'check');
        }
      });
    }
  });

  updateDashboardProgress();
}

function syncChecklistCheckboxes() {
  const checklistItems = document.querySelectorAll('.dashboard-checklist-item');
  checklistItems.forEach(item => {
    const checkKey = item.getAttribute('data-checklist-key');
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox && checkKey) {
      checkbox.checked = state.dashboardChecklist[checkKey] || false;
    }
  });
}

function updateDashboardProgress() {
  const checklist = state.dashboardChecklist;
  const keys = Object.keys(checklist);
  const completedCount = keys.filter(k => checklist[k]).length;
  const totalCount = keys.length; // 4 items = 25% each
  const percentage = completedCount * 25; // 0%, 25%, 50%, 75%, 100%

  const countEl = document.getElementById('dash-progress-count');
  const percentEl = document.getElementById('dash-progress-percent');
  const barEl = document.getElementById('dash-progress-bar');
  const streakEl = document.getElementById('dashboard-streak-count');
  const mobileStreakEl = document.getElementById('mobile-streak-count');

  if (countEl) countEl.textContent = `${completedCount} of ${totalCount} completed`;
  if (percentEl) percentEl.textContent = `${percentage}%`;
  if (barEl) barEl.style.width = `${percentage}%`;

  const userStreak = localStorage.getItem('pmos_streak') || '1';
  if (streakEl) streakEl.textContent = `Day ${userStreak} Streak`;
  if (mobileStreakEl) mobileStreakEl.innerHTML = `🔥 ${userStreak}d streak`;

  // Update Progress Snapshot Bars based on individual pillar activity
  updateSnapshotBar('move', checklist.move ? 100 : 0);
  updateSnapshotBar('nourish', checklist.nourish ? 100 : 0);
  updateSnapshotBar('selfcare', checklist.selfcare ? 100 : 0);
  updateSnapshotBar('mood', checklist.mood ? 100 : 0);
}

function updateSnapshotBar(key, percent) {
  const valEl = document.getElementById(`snapshot-${key}-val`);
  const barEl = document.getElementById(`snapshot-${key}-bar`);
  if (valEl) valEl.textContent = `${percent}%`;
  if (barEl) barEl.style.width = `${percent}%`;
}

// =========================================================================
// 7. Nutrition Section Controller
// =========================================================================
function setupNutritionSection() {
  renderRecipeCards();

  const dietBtns = document.querySelectorAll('.nutrition-filter-btn');
  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dietBtns.forEach(b => {
        b.classList.remove('bg-peach-500', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-charcoal-700', 'hover:bg-cream-100');
      });
      btn.classList.add('bg-peach-500', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-charcoal-700', 'hover:bg-cream-100');

      state.dietaryFilter = btn.getAttribute('data-diet-filter');
      renderRecipeCards();
    });
  });

  const mealTimeBtns = document.querySelectorAll('.mealtime-filter-btn');
  mealTimeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mealTimeBtns.forEach(b => {
        b.classList.remove('border-b-2', 'border-peach-500', 'text-peach-600', 'font-bold');
        b.classList.add('text-charcoal-600');
      });
      btn.classList.add('border-b-2', 'border-peach-500', 'text-peach-600', 'font-bold');
      btn.classList.remove('text-charcoal-600');

      state.mealTimeFilter = btn.getAttribute('data-meal-filter');
      renderRecipeCards();
    });
  });
}

function renderRecipeCards() {
  const container = document.getElementById('nutrition-recipes-grid');
  if (!container) return;

  const filtered = recipes.filter(r => {
    const matchDiet = (state.dietaryFilter === 'all') || (r.type === state.dietaryFilter);
    const matchTime = (state.mealTimeFilter === 'all') || (r.category === state.mealTimeFilter);
    return matchDiet && matchTime;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-blush flex items-center justify-center text-peach-500">
          <i data-lucide="utensils" class="w-7 h-7"></i>
        </div>
        <p class="text-base font-semibold text-charcoal-800">No recipes found matching your filters</p>
        <p class="text-sm text-charcoal-400 mt-1">Try selecting "All" or switching between meal categories.</p>
      </div>
    `;
    initLucideIcons();
    return;
  }

  container.innerHTML = filtered.map(recipe => {
    let badgeHtml = '';
    if (recipe.type === 'veg') {
      badgeHtml = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Veg</span>`;
    } else if (recipe.type === 'egg') {
      badgeHtml = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Eggetarian</span>`;
    } else {
      badgeHtml = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Non-Veg</span>`;
    }

    return `
      <div class="bg-white rounded-2xl border border-blush-dark/40 shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden flex flex-col group">
        <div class="relative h-48 overflow-hidden bg-cream-200">
          <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'" />
          <div class="absolute top-3 left-3">
            ${badgeHtml}
          </div>
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-charcoal-700 shadow-sm flex items-center gap-1">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-peach-500"></i> ${recipe.time}
          </div>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 text-xs font-medium text-charcoal-400 mb-1.5 uppercase tracking-wider">
              <span>${recipe.category}</span> • <span>${recipe.difficulty}</span> • <span>${recipe.protein} Protein</span>
            </div>
            <h3 class="text-base font-bold text-charcoal-900 group-hover:text-peach-600 transition-colors line-clamp-1">${recipe.name}</h3>
            <p class="text-xs text-charcoal-600 mt-2 line-clamp-2 leading-relaxed">${recipe.description}</p>
          </div>
          <div class="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
            <span class="text-xs font-semibold text-charcoal-500">${recipe.calories}</span>
            <button onclick="openRecipeModal('${recipe.id}')" class="inline-flex items-center gap-1.5 text-xs font-bold text-peach-600 hover:text-peach-700 bg-peach-50 hover:bg-peach-100 px-3.5 py-2 rounded-xl transition-colors">
              <span>View Recipe</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

window.openRecipeModal = function (recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  const modal = document.getElementById('recipe-modal');
  const modalContent = document.getElementById('recipe-modal-content');
  if (!modal || !modalContent) return;

  let badgeColor = recipe.type === 'veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (recipe.type === 'egg' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200');

  modalContent.innerHTML = `
    <div class="relative h-64 overflow-hidden rounded-t-3xl bg-cream-200">
      <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent"></div>
      <button onclick="closeRecipeModal()" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-charcoal-800 backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 shadow-md">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <div class="absolute bottom-4 left-6 right-6 text-white">
        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor} mb-2 bg-white/90">
          ${recipe.type.toUpperCase()} • ${recipe.category.toUpperCase()}
        </span>
        <h2 class="text-xl md:text-2xl font-bold font-serif leading-snug">${recipe.name}</h2>
      </div>
    </div>

    <div class="p-6 md:p-8 space-y-6 max-h-[68vh] overflow-y-auto">
      <div class="grid grid-cols-4 gap-2 text-center bg-cream-100 p-3.5 rounded-2xl border border-cream-200">
        <div>
          <p class="text-[10px] uppercase font-semibold text-charcoal-400">Prep Time</p>
          <p class="text-sm font-bold text-charcoal-800 mt-0.5">${recipe.time}</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-semibold text-charcoal-400">Calories</p>
          <p class="text-sm font-bold text-charcoal-800 mt-0.5">${recipe.calories}</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-semibold text-charcoal-400">Protein</p>
          <p class="text-sm font-bold text-peach-600 mt-0.5">${recipe.protein}</p>
        </div>
        <div>
          <p class="text-[10px] uppercase font-semibold text-charcoal-400">Difficulty</p>
          <p class="text-sm font-bold text-charcoal-800 mt-0.5">${recipe.difficulty}</p>
        </div>
      </div>

      <div class="bg-blush/60 border border-blush-dark/60 p-4 rounded-2xl flex items-start gap-3">
        <span class="text-xl">🌸</span>
        <div>
          <h4 class="text-xs font-bold text-charcoal-900 uppercase tracking-wide">PMOS Wellness Benefit</h4>
          <p class="text-xs text-charcoal-700 mt-1 leading-relaxed">${recipe.wellnessTip}</p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3 flex items-center justify-between">
          <span>Ingredients Checklist</span>
          <span class="text-xs font-normal text-charcoal-400">Check off what you have</span>
        </h4>
        <div class="space-y-2">
          ${recipe.ingredients.map(ing => `
            <label class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-cream-50 border border-transparent hover:border-cream-200 cursor-pointer transition-colors">
              <input type="checkbox" class="w-4 h-4 rounded text-peach-500 focus:ring-peach-400 border-charcoal-300" />
              <span class="text-xs md:text-sm text-charcoal-700">${ing}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 class="text-sm font-bold text-charcoal-900 mb-3">Step-by-Step Preparation</h4>
        <div class="space-y-3.5">
          ${recipe.instructions.map((step, idx) => `
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-peach-100 text-peach-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">${idx + 1}</span>
              <p class="text-xs md:text-sm text-charcoal-700 leading-relaxed">${step}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="pt-4 border-t border-cream-200 flex items-center justify-end gap-3">
        <button onclick="closeRecipeModal()" class="px-5 py-2.5 rounded-xl border border-charcoal-200 text-xs font-semibold text-charcoal-700 hover:bg-cream-100 transition-colors">
          Close
        </button>
        <button onclick="saveRecipeFavorite('${recipe.name}')" class="px-5 py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5">
          <i data-lucide="bookmark" class="w-3.5 h-3.5"></i>
          <span>Save to My Favorites</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initLucideIcons();
};

window.closeRecipeModal = function () {
  const modal = document.getElementById('recipe-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

window.saveRecipeFavorite = function (recipeName) {
  showToast('Saved to Favorites', `${recipeName} has been saved to your plan.`, 'bookmark');
  closeRecipeModal();
};

// =========================================================================
// 8. Routines Section Controller
// =========================================================================
function setupRoutinesSection() {
  const tabExercise = document.getElementById('tab-routine-exercise');
  const tabYoga = document.getElementById('tab-routine-yoga');

  if (tabExercise && tabYoga) {
    tabExercise.addEventListener('click', () => {
      state.routineType = 'exercise';
      tabExercise.classList.add('bg-white', 'text-charcoal-900', 'shadow-sm', 'font-bold');
      tabExercise.classList.remove('text-charcoal-500');
      tabYoga.classList.remove('bg-white', 'text-charcoal-900', 'shadow-sm', 'font-bold');
      tabYoga.classList.add('text-charcoal-500');
      renderRoutineView();
    });

    tabYoga.addEventListener('click', () => {
      state.routineType = 'yoga';
      tabYoga.classList.add('bg-white', 'text-charcoal-900', 'shadow-sm', 'font-bold');
      tabYoga.classList.remove('text-charcoal-500');
      tabExercise.classList.remove('bg-white', 'text-charcoal-900', 'shadow-sm', 'font-bold');
      tabExercise.classList.add('text-charcoal-500');
      renderRoutineView();
    });
  }

  const dayPills = document.querySelectorAll('.routine-day-pill');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const dayNum = parseInt(pill.getAttribute('data-day'));
      if (dayNum > 1) {
        showToast('Day Locked 🔒', 'Complete Day 1 to unlock the next session.', 'lock');
        return;
      }
      state.activeDay = dayNum;
      dayPills.forEach(p => p.classList.remove('ring-2', 'ring-peach-500'));
      pill.classList.add('ring-2', 'ring-peach-500');
      renderRoutineView();
    });
  });

  renderRoutineView();
}

function renderRoutineView() {
  const isExercise = state.routineType === 'exercise';
  const routineData = isExercise ? exerciseRoutines : yogaRoutines;
  const currentItems = routineData[`day${state.activeDay}`] || routineData.day1;
  const completedMap = isExercise ? state.exerciseCompleted : state.yogaCompleted;

  const subhead = document.getElementById('routine-count-subhead');
  if (subhead) {
    subhead.textContent = `${isExercise ? '🏃 Exercise' : '🧘 Yoga'} • Day ${state.activeDay} (${currentItems.length} curated exercises)`;
  }

  const total = currentItems.length;
  let done = 0;
  currentItems.forEach(item => {
    if (completedMap[item.id]) done++;
  });
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const progressText = document.getElementById('routine-progress-text');
  const progressBar = document.getElementById('routine-progress-bar');
  if (progressText) progressText.textContent = `${done} / ${total} completed (${percent}%)`;
  if (progressBar) progressBar.style.width = `${percent}%`;

  const cardsContainer = document.getElementById('routine-cards-container');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = currentItems.map((ex, index) => {
    const isDone = completedMap[ex.id] || false;
    const cardBg = isDone ? 'bg-sage-100/30 border-sage-500/30' : 'bg-white border-blush-dark/40';
    const btnClass = isDone ? 'bg-sage-500 text-white' : 'bg-blush text-charcoal-800 hover:bg-peach-100';

    return `
      <div class="rounded-2xl border ${cardBg} p-5 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl ${isDone ? 'bg-sage-500 text-white' : 'bg-blush text-peach-600'} flex items-center justify-center flex-shrink-0 font-bold text-base shadow-sm">
            ${isDone ? '<i data-lucide="check" class="w-6 h-6"></i>' : (index + 1)}
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h4 class="text-base font-bold text-charcoal-900 ${isDone ? 'line-through text-charcoal-400' : ''}">${ex.name}</h4>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lavender-100 text-lavender-700">${ex.difficulty}</span>
              <span class="text-xs text-peach-600 font-semibold">• ${ex.duration}</span>
            </div>
            <p class="text-xs text-charcoal-500 mt-1 font-medium"><strong class="text-charcoal-700">Focus:</strong> ${ex.target}</p>
            <p class="text-xs text-charcoal-600 mt-1 leading-relaxed">${ex.tip}</p>
          </div>
        </div>

        <div class="flex-shrink-0 self-end md:self-center">
          <button onclick="toggleExerciseComplete('${ex.id}')" class="px-4 py-2 rounded-xl ${btnClass} text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
            <i data-lucide="${isDone ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
            <span>${isDone ? 'Completed' : 'Mark Done'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

window.toggleExerciseComplete = function (id) {
  const isExercise = state.routineType === 'exercise';
  const targetMap = isExercise ? state.exerciseCompleted : state.yogaCompleted;

  targetMap[id] = !targetMap[id];
  state.dashboardChecklist.move = Object.values(targetMap).some(v => v);
  syncChecklistCheckboxes();
  updateDashboardProgress();
  renderRoutineView();

  if (targetMap[id]) {
    showToast('Great Job! 🌸', 'Exercise logged to your daily streak.', 'award');
  }
};

// =========================================================================
// 9. Breathing & Journal Controllers
// =========================================================================
function toggleBreathingExercise() {
  const circle = document.getElementById('breathing-guide-circle');
  const label = document.getElementById('breathing-guide-phase');
  const btn = document.getElementById('breathing-guide-toggle');

  if (state.breathingRunning) {
    clearInterval(state.breathingInterval);
    state.breathingRunning = false;
    if (circle) circle.classList.remove('breathing-active');
    if (label) label.textContent = 'Click Start to Begin (4-7-8 Breathing)';
    if (btn) btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Start Breathing Guide`;
  } else {
    state.breathingRunning = true;
    if (circle) circle.classList.add('breathing-active');
    if (btn) btn.innerHTML = `<i data-lucide="square" class="w-4 h-4"></i> Pause Exercise`;

    let seconds = 0;
    const runCycle = () => {
      const cycleTime = seconds % 19;
      if (cycleTime < 4) {
        if (label) label.textContent = `Inhale gently through nose... (${4 - cycleTime}s)`;
      } else if (cycleTime < 11) {
        if (label) label.textContent = `Hold breath softly... (${11 - cycleTime}s)`;
      } else {
        if (label) label.textContent = `Exhale completely through mouth... (${19 - cycleTime}s)`;
      }
      seconds++;
    };
    runCycle();
    state.breathingInterval = setInterval(runCycle, 1000);
  }
  initLucideIcons();
}

function renderJournalList() {
  const container = document.getElementById('journal-entries-list');
  if (!container) return;

  if (state.journalEntries.length === 0) {
    container.innerHTML = `<p class="text-xs text-charcoal-400 italic">No notes saved yet.</p>`;
    return;
  }

  container.innerHTML = state.journalEntries.map(entry => `
    <div class="p-3 bg-cream-50 rounded-xl border border-cream-200 text-xs text-charcoal-700 leading-relaxed">
      <div class="flex items-center justify-between text-[10px] font-semibold text-charcoal-400 mb-1">
        <span>Gratitude Reflection</span>
        <span>${entry.time}</span>
      </div>
      <p>${entry.text}</p>
    </div>
  `).join('');
}

// =========================================================================
// 10. Medication Tracker Controller
// =========================================================================
function setupMedicationTracker() {
  const addBtn = document.getElementById('add-medicine-btn');
  const nameInput = document.getElementById('med-name-input');
  const timeInput = document.getElementById('med-time-input');
  const tagInput = document.getElementById('med-tag-input');

  if (addBtn && nameInput && timeInput) {
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const time = timeInput.value.trim();
      const tag = tagInput ? tagInput.value.trim() : 'Daily';

      if (!name || !time) {
        showToast('Missing Details', 'Please provide both medicine name and reminder time.', 'alert-circle');
        return;
      }

      state.medications.push({
        id: Date.now(),
        name,
        time,
        tag,
        taken: false
      });

      nameInput.value = '';
      timeInput.value = '';
      renderMedicationList();
      showToast('Medication Added', `${name} scheduled for ${time}.`, 'pill');
    });
  }

  renderMedicationList();
}

function renderMedicationList() {
  const container = document.getElementById('medication-list-container');
  if (!container) return;

  if (state.medications.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-cream-50 rounded-2xl border border-dashed border-cream-200">
        <p class="text-xs text-charcoal-500 font-medium">No medications or supplements added yet.</p>
        <p class="text-[11px] text-charcoal-400 mt-1">Use the form above to set your daily reminders.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.medications.map(med => {
    const isTaken = med.taken;
    return `
      <div class="p-4 rounded-2xl border ${isTaken ? 'bg-sage-100/30 border-sage-500/30' : 'bg-white border-blush-dark/40'} shadow-sm flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl ${isTaken ? 'bg-sage-500 text-white' : 'bg-blush text-peach-600'} flex items-center justify-center font-bold">
            <i data-lucide="pill" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold text-charcoal-900 ${isTaken ? 'line-through text-charcoal-400' : ''}">${med.name}</h4>
            <div class="flex items-center gap-2 text-xs text-charcoal-500 mt-0.5">
              <span>⏰ ${med.time}</span>
              <span>•</span>
              <span class="px-2 py-0.5 rounded-full bg-cream-100 text-charcoal-600 text-[10px] font-semibold">${med.tag}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="toggleMedicationTaken(${med.id})" class="px-3 py-1.5 rounded-xl ${isTaken ? 'bg-sage-500 text-white' : 'bg-cream-100 hover:bg-sage-100 text-charcoal-700'} text-xs font-semibold transition-colors flex items-center gap-1">
            <i data-lucide="${isTaken ? 'check-circle' : 'circle'}" class="w-3.5 h-3.5"></i>
            <span>${isTaken ? 'Taken' : 'Take'}</span>
          </button>
          <button onclick="deleteMedication(${med.id})" class="p-1.5 rounded-xl text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  initLucideIcons();
}

window.toggleMedicationTaken = function (id) {
  const med = state.medications.find(m => m.id === id);
  if (med) {
    med.taken = !med.taken;
    renderMedicationList();
    if (med.taken) {
      showToast('Dose Logged', `Marked ${med.name} as taken.`, 'check');
    }
  }
};

window.deleteMedication = function (id) {
  state.medications = state.medications.filter(m => m.id !== id);
  renderMedicationList();
  showToast('Removed', 'Medication removed from reminder list.', 'trash');
};

// =========================================================================
// 11. Photo Uploads & Toast Feedback
// =========================================================================
function setupProgressJourney() {
  setupImageUploader('upload-before-input', 'preview-before-img', 'placeholder-before-box');
  setupImageUploader('upload-current-input', 'preview-current-img', 'placeholder-current-box');
}

function setupImageUploader(inputId, imgId, placeholderId) {
  const input = document.getElementById(inputId);
  const img = document.getElementById(imgId);
  const placeholder = document.getElementById(placeholderId);

  if (input && img && placeholder) {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          img.src = event.target.result;
          img.classList.remove('hidden');
          placeholder.classList.add('hidden');
          showToast('Photo Uploaded', 'Progress image preview updated.', 'image');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function setupModalsAndToasts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRecipeModal();
    }
  });

  const recipeModal = document.getElementById('recipe-modal');
  if (recipeModal) {
    recipeModal.addEventListener('click', (e) => {
      if (e.target === recipeModal) {
        closeRecipeModal();
      }
    });
  }
}

function showToast(title, message, icon = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-charcoal-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-charcoal-700 flex items-center gap-3 transform transition-all duration-300 translate-y-3 opacity-0 text-xs';

  toast.innerHTML = `
    <div class="w-7 h-7 rounded-xl bg-peach-500/20 text-peach-400 flex items-center justify-center flex-shrink-0">
      <i data-lucide="${icon}" class="w-4 h-4"></i>
    </div>
    <div>
      <h5 class="font-bold text-white">${title}</h5>
      <p class="text-charcoal-300 text-[11px] mt-0.5">${message}</p>
    </div>
  `;

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}