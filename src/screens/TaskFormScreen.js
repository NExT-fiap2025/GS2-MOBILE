import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { saveTask, generateAISuggestion } from '../services/taskService';
import { Ionicons } from '@expo/vector-icons'; 

export default function TaskFormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState(''); // NOVO
  const [project, setProject] = useState('');         // NOVO
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [priority, setPriority] = useState('Baixa');

  const handleAIAnalysis = () => {
    if (!title && !description) {
      Alert.alert("IA diz:", "Por favor, digite algo para eu analisar.");
      return;
    }
    const suggestion = generateAISuggestion(title, description);
    setAiSuggestion(suggestion);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório!");
      return;
    }

    const newTask = {
      title,
      description,
      responsible: responsible || 'Não atribuído', // Salva o responsável
      project: project || 'Geral',                 // Salva o projeto
      aiSuggestion,
      priority,
      done: false,
    };

    await saveTask(newTask);
    Alert.alert("Sucesso", "Tarefa criada com sucesso!");
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Título da Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Corrigir bug na produção..."
          value={title}
          onChangeText={setTitle}
        />
        
        {/* --- NOVOS CAMPOS --- */}
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Responsável</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Enzo"
              value={responsible}
              onChangeText={setResponsible}
            />
          </View>
          <View style={[styles.col, { marginLeft: 10 }]}>
            <Text style={styles.label}>Projeto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Global Solution"
              value={project}
              onChangeText={setProject}
            />
          </View>
        </View>
        {/* -------------------- */}

        <Text style={styles.label}>Nível de Prioridade (Risco)</Text>
        <View style={styles.priorityContainer}>
          {['Baixa', 'Média', 'Alta'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.priorityButton,
                priority === level && styles.priorityButtonActive,
                priority === level && { backgroundColor: getPriorityColor(level) }
              ]}
              onPress={() => setPriority(level)}
            >
              <Text style={[
                styles.priorityText, 
                priority === level && { color: '#FFF' }
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva o contexto..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.aiButton} onPress={handleAIAnalysis}>
          <Ionicons name="sparkles" size={20} color="#FFF" style={{ marginRight: 10 }} />
          <Text style={styles.aiButtonText}>Analisar com IA</Text>
        </TouchableOpacity>

        {aiSuggestion ? (
          <View style={styles.suggestionBox}>
            <Text style={styles.suggestionText}>{aiSuggestion}</Text>
          </View>
        ) : null}

        <View style={styles.spacer} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Tarefa</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const getPriorityColor = (level) => {
  if (level === 'Alta') return '#ff5252';
  if (level === 'Média') return '#ffb142';
  return '#2ed573';
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#F2F5F8' },
  label: { fontSize: 12, fontWeight: 'bold', marginTop: 16, color: '#636E72', textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DFE6E9', padding: 14, borderRadius: 12, marginTop: 6, fontSize: 16, color: '#2D3436' },
  textArea: { height: 100, textAlignVertical: 'top' },
  
  row: { flexDirection: 'row' },
  col: { flex: 1 },

  priorityContainer: { flexDirection: 'row', marginTop: 8, gap: 10 },
  priorityButton: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DFE6E9', alignItems: 'center', backgroundColor: '#FFF' },
  priorityButtonActive: { borderColor: 'transparent' },
  priorityText: { fontWeight: 'bold', color: '#636E72' },

  aiButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6200ea', padding: 16, borderRadius: 12, marginTop: 24, elevation: 4 },
  aiButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  suggestionBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, marginTop: 20, borderWidth: 1, borderColor: '#E0E0E0', borderLeftWidth: 6, borderLeftColor: '#00B894' },
  suggestionText: { color: '#2D3436', fontSize: 15, fontStyle: 'italic' },
  spacer: { flex: 1 },
  saveButton: { backgroundColor: '#00B894', padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center', marginBottom: 20, elevation: 2 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});