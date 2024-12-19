import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

export default function FavoritesTab() {
  const { favorites } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Recipes</Text>
      {favorites.length === 0 ? (
        <Text>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
