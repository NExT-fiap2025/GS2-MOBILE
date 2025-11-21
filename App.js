import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando as telas
import HomeScreen from './src/screens/HomeScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ea' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Minhas Tarefas' }} 
        />
        
        <Stack.Screen 
          name="TaskForm" 
          component={TaskFormScreen} 
          options={{ 
            title: 'Nova Tarefa',
            headerBackTitle: 'Voltar' // Força o texto "Voltar" no iOS
          }} 
        />
        
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen} 
          options={{ 
            title: 'Detalhes',
            headerBackTitle: 'Voltar' // <--- AQUI ESTÁ A CORREÇÃO QUE VOCÊ PEDIU
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}