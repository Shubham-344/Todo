import { useState, useEffect, useCallback } from 'react';
import { getTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from '../utils/storage';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
      applyFilter(loadedTasks, filter);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const applyFilter = useCallback((taskList, filterType) => {
    switch (filterType) {
      case 'completed':
        setFilteredTasks(taskList.filter(task => task.completed));
        break;
      case 'pending':
        setFilteredTasks(taskList.filter(task => !task.completed));
        break;
      case 'all':
      default:
        setFilteredTasks(taskList);
        break;
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    applyFilter(tasks, filter);
  }, [tasks, filter, applyFilter]);

  const refreshTasks = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const createTask = async (newTask) => {
    try {
      const task = await addTask(newTask);
      if (task) {
        
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        
        
        applyFilter(updatedTasks, filter);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating task:', error);
      return false;
    }
  };

  const editTask = async (task) => {
    try {
      const success = await updateTask(task);
      if (success) {
  
        const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
        setTasks(updatedTasks);
        
        applyFilter(updatedTasks, filter);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error editing task:', error);
      return false;
    }
  };

  const removeTask = async (taskId) => {
    try {
      const success = await deleteTask(taskId);
      if (success) {
        
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        
        applyFilter(updatedTasks, filter);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error removing task:', error);
      return false;
    }
  };

  const toggleCompletion = async (taskId) => {
    try {
      const success = await toggleTaskCompletion(taskId);
      if (success) {
        
        const updatedTasks = tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        
        applyFilter(updatedTasks, filter);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error toggling task completion:', error);
      return false;
    }
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return {
    tasks: filteredTasks,
    loading,
    refreshing,
    filter,
    refreshTasks,
    createTask,
    editTask,
    removeTask,
    toggleCompletion,
    changeFilter,
  };
};