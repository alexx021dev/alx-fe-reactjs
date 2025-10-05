import { useState } from "react";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Please enter at least two ingredients.";
    } else {
      const ingredientsList = formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);
      if (ingredientsList.length < 2) {
        newErrors.ingredients = "Include at least two ingredients.";
      }
    }
    if (!formData.steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Recipe Submitted:", formData);
      setSuccess(true);
      setFormData({ title: "", ingredients: "", steps: "" });
      setErrors({});
    } else {
      setSuccess(false);
    }
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          🍳 Add a New Recipe
        </h1>

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm text-center">
            Recipe added successfully! 🎉
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recipe Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              className={`w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients (comma separated)
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="e.g., Eggs, Flour, Milk"
              rows="3"
              className={`w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preparation Steps
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="Write each step separated by a period."
              rows="4"
              className={`w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none ${
                errors.steps ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-all"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
