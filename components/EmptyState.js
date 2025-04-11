import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const EmptyState = ({ filter }) => {
  let message = 'No tasks yet. Add your first task!';
  
  if (filter === 'completed') {
    message = 'No completed tasks yet.';
  } else if (filter === 'pending') {
    message = 'No pending tasks. Great job!';
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📝</Text>
      </View>
      <Text style={styles.title}>Nothing Here</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    display:'flex',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:10,
    marginBottom: 16,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default EmptyState;