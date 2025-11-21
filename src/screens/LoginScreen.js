import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  Image,
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Verifica se já tem usuário salvo para entrar direto (opcional)
  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const savedName = await AsyncStorage.getItem('@user_name');
    if (savedName) {
      // Se quiser que ele entre direto sem login, descomente a linha abaixo:
      // navigation.replace('Home'); 
    }
  };

  const handleLogin = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Ops!', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Salvamos o nome para usar na Home
      await AsyncStorage.setItem('@user_name', name);
      
      // Usamos .replace() em vez de .navigate() para que o usuário 
      // não consiga voltar para o login apertando "voltar"
      navigation.replace('Home');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar seus dados.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Ícone ou Logo Simulado */}
        <View style={styles.iconContainer}>
          <Ionicons name="cube-outline" size={64} color="#FFF" />
        </View>

        <Text style={styles.title}>Future Tasks</Text>
        <Text style={styles.subtitle}>Organize seu futuro, hoje.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>SEU NOME</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Gustavo"
            placeholderTextColor="#A0A0A0"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>SEU E-MAIL</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: TaskAI@fiap.com.br" 
            placeholderTextColor="#A0A0A0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>ACESSAR PLATAFORMA</Text>
            <Ionicons name="arrow-forward" size={20} color="#6200ea" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#6200ea', // Fundo roxo tech
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  iconContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9E9E9E',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#F5F6FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  button: {
    backgroundColor: '#00D2D3', // Ciano para contraste com roxo
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#FFF', // Texto branco
    fontWeight: 'bold',
    fontSize: 16,
  }
});