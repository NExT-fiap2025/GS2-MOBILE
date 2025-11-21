import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;

  const getPriorityColor = (level) => {
    if (level === 'Alta') return '#ff5252';
    if (level === 'Média') return '#ffb142';
    return '#2ed573';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <View style={styles.badgesRow}>
          {task.priority && (
            <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) }]}>
              <Text style={styles.badgeText}>{task.priority}</Text>
            </View>
          )}
          <View style={[styles.badge, { backgroundColor: task.done ? '#2ed573' : '#74b9ff' }]}>
            <Text style={styles.badgeText}>{task.done ? 'Concluída' : 'Pendente'}</Text>
          </View>
        </View>
      </View>

      {/* --- NOVA SEÇÃO: INFO CARD (Responsável e Projeto) --- */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="person-circle-outline" size={24} color="#6200ea" />
          <View>
             <Text style={styles.infoLabel}>Responsável</Text>
             <Text style={styles.infoValue}>{task.responsible || 'Não atribuído'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="folder-open-outline" size={24} color="#6200ea" />
          <View>
             <Text style={styles.infoLabel}>Projeto</Text>
             <Text style={styles.infoValue}>{task.project || 'Geral'}</Text>
          </View>
        </View>
      </View>
      {/* -------------------------------------------------- */}

      {task.aiSuggestion ? (
        <View style={styles.aiBox}>
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={20} color="#6200ea" />
            <Text style={styles.aiTitle}>Análise da IA</Text>
          </View>
          <Text style={styles.aiText}>{task.aiSuggestion}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.label}>DESCRIÇÃO</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {task.description || "Sem descrição detalhada."}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
         <Text style={styles.date}>Criado em: {task.date}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F2F5F8' },
  
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2D3436', marginBottom: 10 },
  badgesRow: { flexDirection: 'row', gap: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

  // Estilos do Info Card (Novo)
  infoCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 24, elevation: 2 },
  infoRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoLabel: { fontSize: 10, color: '#B2BEC3', fontWeight: 'bold', textTransform: 'uppercase' },
  infoValue: { fontSize: 14, color: '#2D3436', fontWeight: '600' },
  divider: { width: 1, backgroundColor: '#F0F0F0', marginHorizontal: 10 },

  aiBox: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#6200ea', elevation: 3 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  aiTitle: { fontWeight: 'bold', color: '#6200ea', fontSize: 16 },
  aiText: { color: '#2D3436', fontSize: 15, lineHeight: 22, fontStyle: 'italic' },

  section: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#B2BEC3', marginBottom: 8, letterSpacing: 1 },
  descriptionBox: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#DFE6E9' },
  descriptionText: { color: '#2D3436', fontSize: 16, lineHeight: 24 },

  footer: { alignItems: 'flex-end', marginBottom: 10 },
  date: { color: '#636E72', fontSize: 12, fontStyle: 'italic' },

  backButton: { backgroundColor: '#DFE6E9', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  backButtonText: { color: '#2D3436', fontWeight: 'bold', fontSize: 16 },
});