import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAppContext } from '../context/AppContext'; // Duke supozuar se ky është konteksti juaj për menaxhimin e gjendjes globale

// Ky është çelësi juaj API për Spoonacular. Sigurohuni që ta zëvendësoni me një të vlefshëm
const API_KEY = 'a65eb4e84c4641aa91bb684bb9031032';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

export default function RecipesTab() {
  const { mealPlan, setMealPlan, favorites, setFavorites } = useAppContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      // Ky është një shembull i endpoint-it. Mund ta përshtatni sipas nevojës
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=10&apiKey=${API_KEY}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.log('Error fetching recipes:', error);
    }
  };

  const addToMealPlan = (recipe: Recipe) => {
    setMealPlan((prev) => [...prev, recipe]);
  };

  const addToFavorites = (recipe: Recipe) => {
    // Kontrollohet nëse receta është tashmë në preferenca
    if (!favorites.find((fav) => fav.id === recipe.id)) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => addToMealPlan(item)}>
          <Text style={styles.actionText}>Add to Meal Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToFavorites(item)}>
          <Text style={styles.actionText}>☆ Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      <FlatList 
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  recipeCard: { padding: 12, backgroundColor: '#eee', marginBottom: 8, borderRadius: 8 },
  recipeTitle: { fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  actionText: { color: 'blue', marginHorizontal: 8 }
});