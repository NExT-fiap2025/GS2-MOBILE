import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTasks, deleteTask, toggleTaskStatus } from '../services/taskService';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [userName, setUserName] = useState('');

  const loadUser = async () => {
    const name = await AsyncStorage.getItem('@user_name');
    if (name) {
      setUserName(name);
      navigation.setOptions({ 
        title: `Olá, ${name}`,
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 10 }}>
            <Ionicons name="log-out-outline" size={24} color="#FFF" />
          </TouchableOpacity>
        )
      });
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sair', 'Deseja voltar para o login?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => navigation.replace('Login') }
    ]);
  };

  const loadTasks = async () => {
    const data = await getTasks();
    const sortedData = data.sort((a, b) => Number(a.done) - Number(b.done));
    setTasks(sortedData);
    const done = data.filter(t => t.done).length;
    setCompletedCount(done);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
      loadUser();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert("Excluir Tarefa", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim, excluir", style: 'destructive', onPress: async () => { await deleteTask(id); loadTasks(); } }
    ]);
  };

  const handleToggle = async (id) => {
    await toggleTaskStatus(id);
    loadTasks();
  };

  const getPriorityColor = (level) => {
    if (level === 'Alta') return '#ff5252';
    if (level === 'Média') return '#ffb142';
    return '#2ed573';
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.done && styles.cardDone]}>
      <TouchableOpacity 
        style={[styles.checkbox, item.done && styles.checkboxChecked]} 
        onPress={() => handleToggle(item.id)}
      >
        {item.done && <Ionicons name="checkmark" size={18} color="#FFF" />}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.cardContent} 
        onPress={() => navigation.navigate('TaskDetail', { task: item })}
      >
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.taskTitle, item.done && styles.textDone]} numberOfLines={1}>
              {item.title}
            </Text>
            {item.priority && (
              <View style={[styles.badge, { backgroundColor: getPriorityColor(item.priority) }]}>
                <Text style={styles.badgeText}>{item.priority}</Text>
              </View>
            )}
          </View>
          
          {/* --- NOVO: MOSTRAR PROJETO NA HOME --- */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
             <Ionicons name="folder-outline" size={12} color="#636E72" style={{ marginRight: 4 }} />
             <Text style={styles.projectText}>{item.project || 'Geral'}</Text>
          </View>
          {/* ------------------------------------- */}

          <Text style={styles.taskDate}>{item.date}</Text>
          {item.aiSuggestion ? (
            <Text style={styles.aiIndicator}>✨ Ver análise da IA</Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
        <Ionicons name="trash-outline" size={22} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {userName ? `${userName}, você completou:` : 'Progresso:'}
        </Text>
        <View style={styles.infoRow}>
           <Text style={styles.statsText}>{completedCount} de {tasks.length} tarefas</Text>
        </View>
        <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: tasks.length > 0 ? `${(completedCount / tasks.length) * 100}%` : '0%' }
              ]} 
            />
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Olá, {userName || 'Visitante'}!</Text>
          <Text style={styles.emptySubText}>Adicione tarefas aos seus projetos!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TaskForm')}>
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5F8' },
  progressContainer: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  progressText: { color: '#2D3436', fontWeight: 'bold', fontSize: 16 },
  infoRow: { marginBottom: 8, marginTop: 2 },
  statsText: { color: '#636E72', fontSize: 14 },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#00B894', borderRadius: 4 },
  listContent: { padding: 20, paddingBottom: 100 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#6200ea', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  cardDone: { backgroundColor: '#F8F9FA', opacity: 0.7 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#6200ea', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#6200ea', borderColor: '#6200ea' },
  cardContent: { flex: 1, marginRight: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 4 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#2D3436', flex: 1 },
  textDone: { textDecorationLine: 'line-through', color: '#B2BEC3' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginLeft: 6 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  
  // Estilo Novo do Projeto
  projectText: { fontSize: 12, color: '#636E72', fontWeight: '500' },

  taskDate: { fontSize: 12, color: '#B2BEC3', marginTop: 2 },
  aiIndicator: { fontSize: 11, color: '#6200ea', marginTop: 6, fontWeight: 'bold', backgroundColor: '#EDE7F6', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', overflow: 'hidden' },
  deleteBtn: { padding: 8, backgroundColor: '#FFEBEE', borderRadius: 8 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#2D3436', textAlign: 'center' },
  emptySubText: { fontSize: 15, color: '#636E72', marginTop: 10, textAlign: 'center' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#6200ea', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#6200ea', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6 },
});