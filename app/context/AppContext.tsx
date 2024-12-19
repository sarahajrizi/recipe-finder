import React, { createContext, useContext, useState, ReactNode } from 'react';

type Recipe = {
  id: number;
  title: string;
  image?: string;
};

type AppContextType = {
  mealPlan: Recipe[];
  setMealPlan: React.Dispatch<React.SetStateAction<Recipe[]>>;
  favorites: Recipe[];
  setFavorites: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [mealPlan, setMealPlan] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  return (
    <AppContext.Provider value={{ mealPlan, setMealPlan, favorites, setFavorites }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
