// TODO: Remove these object once we have the database functioning.
const getAllRecipesObj = [
  {
    _id: 1,
    recipe_name: "Best Grilled Cheese",
    rating: 4.4,
    source: "All Recipes",
    source_url:
      "https://www.allrecipes.com/recipe/125434/grilled-cheese-of-the-gods/",
    author: null,
  },
  {
    _id: 2,
    recipe_name: "BLT",
    rating: 4.8,
    source: "Potluck",
    source_url: "/recipes/2",
    author: "Lucas",
  },
  {
    _id: 3,
    recipe_name: "BLT",
    rating: 4.8,
    source: "Potluck",
    source_url: "/recipes/3",
    author: "Ethan",
  },
  {
    _id: 4,
    recipe_name: "Bacon",
    rating: 4.8,
    source: "Potluck",
    source_url: "/recipes/4",
    author: "Randy",
  },
  {
    _id: 5,
    recipe_name: "BLT",
    rating: 4.8,
    source: "Potluck",
    source_url: "/recipes/5",
    author: "Dallas",
  },
];

const dataObjs = [
  {
    _id: 1,
    recipe_name: "Best Grilled Cheese",
    description:
      "This easy grilled cheese sandwich has a crispy Parmesan crust and a gooey Cheddar and bacon filling, and is simply the best I've ever had! As far as grilled cheese goes, this is it!",
    ingredients: [
      {
        ingredient_name: "Cheddar Cheese",
        measurement: "slice",
        amount: "3",
      },
      {
        ingredient_name: "butter, softened",
        measurement: "cup",
        amount: "1/4",
      },
      {
        ingredient_name: "Cooked Bacon",
        measurement: "slice",
        amount: "8",
      },
      {
        ingredient_name: "freshly grated Parmigiano-Reggiano cheese",
        measurement: "cup",
        amount: "1",
      },
    ],
    directions: "Butter",
    servings: 4,
    prep_time: 10, // Time in minutes
    cook_time: 6,
    author: null,
    source: "allrecipes",
    source_url:
      "https://www.allrecipes.com/recipe/125434/grilled-cheese-of-the-gods/",
    tags: [],
    created_date: "11/16/2022 03:23:15 AM",
    ratings: { 1: [], 2: ["ringo"], 3: [], 4: [], 5: ["george", "paul"] },
    rating: 4.4,
    comments: [
      {
        comment_text: "Best Grilled Cheese I've EVER HAD!!!",
        posted_date: "11/16/2022 04:20:10 AM",
        comment_by: "paul",
      },
      {
        comment_text: "I don't like bacon in my grilled cheese",
        posted_date: "11/16/2022 04:22:12 AM",
        comment_by: "ringo",
      },
    ],
  },
  {
    _id: 2,
    recipe_name: "Best Grilled Cheese",
    description:
      "This easy grilled cheese sandwich has a crispy Parmesan crust and a gooey Cheddar and bacon filling, and is simply the best I've ever had! As far as grilled cheese goes, this is it!",
    ingredients: [
      {
        ingredient_name: "Cheddar Cheese",
        measurement: "slice",
        amount: "3",
      },
      {
        ingredient_name: "butter, softened",
        measurement: "cup",
        amount: "1/4",
      },
      {
        ingredient_name: "Cooked Bacon",
        measurement: "slice",
        amount: "8",
      },
      {
        ingredient_name: "freshly grated Parmigiano-Reggiano cheese",
        measurement: "cup",
        amount: "1",
      },
    ],
    directions: "Butter",
    servings: 4,
    prep_time: 10, // Time in minutes
    cook_time: 6,
    author: "Lucas",
    source: "Potluck",
    source_url: "/recipes/2",
    tags: [],
    created_date: "11/16/2022 03:23:15 AM",
    ratings: { 1: [], 2: ["ringo"], 3: [], 4: [], 5: ["george", "paul"] },
    rating: 4.4,
    comments: [
      {
        comment_text: "Best Grilled Cheese I've EVER HAD!!!",
        posted_date: "11/16/2022 04:20:10 AM",
        comment_by: "paul",
      },
      {
        comment_text: "I don't like bacon in my grilled cheese",
        posted_date: "11/16/2022 04:22:12 AM",
        comment_by: "ringo",
      },
    ],
  },
  {
    _id: 3,
    recipe_name: "Best Grilled Cheese",
    description:
      "This easy grilled cheese sandwich has a crispy Parmesan crust and a gooey Cheddar and bacon filling, and is simply the best I've ever had! As far as grilled cheese goes, this is it!",
    ingredients: [
      {
        ingredient_name: "Cheddar Cheese",
        measurement: "slice",
        amount: "3",
      },
      {
        ingredient_name: "butter, softened",
        measurement: "cup",
        amount: "1/4",
      },
      {
        ingredient_name: "Cooked Bacon",
        measurement: "slice",
        amount: "8",
      },
      {
        ingredient_name: "freshly grated Parmigiano-Reggiano cheese",
        measurement: "cup",
        amount: "1",
      },
    ],
    directions: "Butter",
    servings: 4,
    prep_time: 10, // Time in minutes
    cook_time: 6,
    author: "Ethan",
    source: "Potluck",
    source_url: "/recipes/3",
    tags: [],
    created_date: "11/16/2022 03:23:15 AM",
    ratings: { 1: [], 2: ["ringo"], 3: [], 4: [], 5: ["george", "paul"] },
    rating: 4.4,
    comments: [
      {
        comment_text: "Best Grilled Cheese I've EVER HAD!!!",
        posted_date: "11/16/2022 04:20:10 AM",
        comment_by: "paul",
      },
      {
        comment_text: "I don't like bacon in my grilled cheese",
        posted_date: "11/16/2022 04:22:12 AM",
        comment_by: "ringo",
      },
    ],
  },
  {
    _id: 4,
    recipe_name: "Bacon",
    description: "It's Bacon!",
    ingredients: [
      {
        ingredient_name: "Bacon",
        measurement: "package",
        amount: "1",
      },
    ],
    directions: "Cook bacon!",
    servings: 1,
    prep_time: 10, // Time in minutes
    cook_time: 6,
    author: "Randy",
    source: "Potluck",
    source_url: "/recipes/5",
    tags: [],
    created_date: "11/16/2022 03:23:15 AM",
    ratings: { 1: [], 2: [], 3: [], 4: [], 5: [] },
    rating: 0,
    comments: [],
  },
  {
    _id: 5,
    recipe_name: "Best Grilled Cheese",
    description:
      "This easy grilled cheese sandwich has a crispy Parmesan crust and a gooey Cheddar and bacon filling, and is simply the best I've ever had! As far as grilled cheese goes, this is it!",
    ingredients: [
      {
        ingredient_name: "Cheddar Cheese",
        measurement: "slice",
        amount: "3",
      },
      {
        ingredient_name: "butter, softened",
        measurement: "cup",
        amount: "1/4",
      },
      {
        ingredient_name: "Cooked Bacon",
        measurement: "slice",
        amount: "8",
      },
      {
        ingredient_name: "freshly grated Parmigiano-Reggiano cheese",
        measurement: "cup",
        amount: "1",
      },
    ],
    directions: "Butter",
    servings: 4,
    prep_time: 10, // Time in minutes
    cook_time: 6,
    author: "Dallas",
    source: "Potluck",
    source_url: "/recipes/5",
    tags: [],
    created_date: "11/16/2022 03:23:15 AM",
    ratings: { 1: [], 2: ["ringo"], 3: [], 4: [], 5: ["george", "paul"] },
    rating: 4.4,
    comments: [
      {
        comment_text: "Best Grilled Cheese I've EVER HAD!!!",
        posted_date: "11/16/2022 04:20:10 AM",
        comment_by: "paul",
      },
      {
        comment_text: "I don't like bacon in my grilled cheese",
        posted_date: "11/16/2022 04:22:12 AM",
        comment_by: "ringo",
      },
    ],
  },
];

const getAllRecipes = () => {
  //TODO: Create query to get all recipes from database
  // * Should return an Array of Recipe objects
  const data = getAllRecipesObj;
  return data;
};
