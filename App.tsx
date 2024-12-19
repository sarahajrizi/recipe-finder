import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppContextProvider } from './app/context/AppContext';

import RecipesTab from './app/tabs/RecipesTab';
import MealPlanTab from './app/tabs/MealPlanTab';
import FavoritesTab from './app/tabs/FavoritesTab';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Recipes" component={RecipesTab} />
            <Tab.Screen name="MealPlan" component={MealPlanTab} />
            <Tab.Screen name="Favorites" component={FavoritesTab} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </AppContextProvider>
    </SafeAreaProvider>
  );
}
