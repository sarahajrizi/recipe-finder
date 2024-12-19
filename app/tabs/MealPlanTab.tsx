import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function MealPlanTab() {
  const { mealPlan, setMealPlan } = useAppContext();

  const removeMeal = (id: number) => {
    setMealPlan((prev) => prev.filter((meal) => meal.id !== id));
  };

  const renderMeal = ({ item }: { item: { id: number; title: string } }) => (
    <View style={styles.mealItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => removeMeal(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Meal Plan</Text>
      <FlatList
        data={mealPlan}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMeal}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  addButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginBottom: 16 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  mealItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 8, backgroundColor: '#eee', marginBottom: 8, borderRadius: 8 },
  removeButton: { color: 'red' }
});
