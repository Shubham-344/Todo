import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/EmptyState';
import SwipeableTaskItem from '../components/SwipeableTaskItem';

const HomeScreen = ({ navigation }) => {
  const { username, logout } = useAuth();
  const { 
    tasks, 
    loading, 
    refreshing, 
    filter, 
    refreshTasks, 
    removeTask, 
    toggleCompletion, 
    changeFilter 
  } = useTasks();

  const handleAddTask = () => {
    navigation.navigate('TaskForm', { task: null });
  };

  const handleEditTask = (task) => {
    navigation.navigate('TaskForm', { task });
  };

  const handleDeleteTask = async (taskId) => {
    await removeTask(taskId);
  };

  const handleToggleCompletion = async (taskId) => {
    await toggleCompletion(taskId);
  };

  const FilterButton = ({ title, filterValue }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterValue ? styles.activeFilterButton : null
      ]}
      onPress={() => changeFilter(filterValue)}
    >
      <Text 
        style={[
          styles.filterButtonText,
          filter === filterValue ? styles.activeFilterButtonText : null
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, {username}!</Text>
          <Text style={styles.subtitleText}>Manage your tasks efficiently</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton title="All" filterValue="all" />
        <FilterButton title="Pending" filterValue="pending" />
        <FilterButton title="Completed" filterValue="completed" />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SwipeableTaskItem
            task={item}
            onToggleCompletion={() => handleToggleCompletion(item.id)}
            onEdit={() => handleEditTask(item)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        )}
        contentContainerStyle={tasks.length === 0 ? styles.emptyListContent : styles.listContent}
        ListEmptyComponent={<EmptyState filter={filter} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshTasks}
            colors={['#3498db']}
          />
        }
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18243c',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitleText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#ecf0f1',
  },
  activeFilterButton: {
    backgroundColor: '#081325',
  },
  filterButtonText: {
    color: '#7f8c8d',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, 
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100, 
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#081325',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
    lineHeight: 56,
  },
});

export default HomeScreen;