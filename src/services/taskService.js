import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_KEY = '@tasks_data';

// --- FUNÇÃO 1: IA SIMULADA (O "Cérebro") ---
// Analisa o título/descrição e devolve uma sugestão "inteligente"
export const generateAISuggestion = (title, description) => {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('bug') || text.includes('erro') || text.includes('fix')) {
    return "🤖 Sugestão da IA: Lembre-se de verificar os logs e criar um caso de teste que reproduza esse erro antes de corrigir.";
  }
  if (text.includes('teste') || text.includes('qa')) {
    return "🤖 Sugestão da IA: Que tal automatizar esses testes? Verifique se a cobertura de código está acima de 80%.";
  }
  if (text.includes('deploy') || text.includes('produção')) {
    return "🤖 Sugestão da IA: Atenção! Verifique as variáveis de ambiente e faça um backup do banco antes do deploy.";
  }
  if (text.includes('front') || text.includes('css') || text.includes('tela')) {
    return "🤖 Sugestão da IA: Verifique a responsividade em telas menores e o contraste para acessibilidade.";
  }
  
  // Sugestão padrão se não encontrar palavras-chave
  return "🤖 Sugestão da IA: Defina critérios de aceite claros para esta tarefa para evitar retrabalho.";
};

// --- FUNÇÃO 2: LISTAR TAREFAS (Read) ---
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASK_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar tarefas", e);
    return [];
  }
};

// --- FUNÇÃO 3: SALVAR NOVA TAREFA (Create) ---
export const saveTask = async (newTask) => {
  try {
    const currentTasks = await getTasks();
    // Adiciona ID único e Data
    const taskWithId = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      ...newTask
    };
    
    const updatedTasks = [...currentTasks, taskWithId];
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updatedTasks));
    return taskWithId;
  } catch (e) {
    console.error("Erro ao salvar tarefa", e);
  }
};

// --- FUNÇÃO 4: DELETAR TAREFA (Delete) ---
export const deleteTask = async (id) => {
  try {
    const currentTasks = await getTasks();
    const filteredTasks = currentTasks.filter(task => task.id !== id);
    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(filteredTasks));
    return filteredTasks;
  } catch (e) {
    console.error("Erro ao deletar", e);
  }
};

// --- FUNÇÃO 5: ATUALIZAR STATUS (Update) ---
export const toggleTaskStatus = async (id) => {
    try {
      const currentTasks = await getTasks();
      const updatedTasks = currentTasks.map(task => 
        task.id === id ? { ...task, done: !task.done } : task
      );
      await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updatedTasks));
      return updatedTasks;
    } catch (e) {
      console.error("Erro ao atualizar status", e);
    }
  };