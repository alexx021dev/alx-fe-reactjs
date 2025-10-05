import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      });
  }, [id]);

  if (!recipe) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {recipe.title}
        </h1>
        <p className="text-gray-700 mb-6">{recipe.summary}</p>

        <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {recipe.ingredients?.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
