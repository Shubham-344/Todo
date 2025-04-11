import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'todo_tasks';

export const getTasks = async () => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks:', error);
    return false;
  }
};

export const addTask = async (task) => {
  try {
    const tasks = await getTasks();
    const newTask = { ...task, id: Date.now().toString() };
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const updateTask = async (updatedTask) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    await saveTasks(updatedTasks);
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(updatedTasks);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

export const toggleTaskCompletion = async (taskId) => {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    await saveTasks(updatedTasks);
    return true;
  } catch (error) {
    console.error('Error toggling task completion:', error);
    return false;
  }
};