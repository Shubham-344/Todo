import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Image
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const SwipeableTaskItem = ({ task, onToggleCompletion, onEdit, onDelete }) => {
  const swipeableRef = useRef(null);

  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        <TouchableOpacity 
          style={styles.editAction}
          onPress={() => {
            closeSwipeable();
            onEdit();
          }}
        >
          <Image source={require('../assets/edit.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteAction}
          onPress={() => {
            closeSwipeable();
            onDelete();
          }}
        >
          <Image source={require('../assets/delete.png')} style={{height:25,width:25}}/>
        </TouchableOpacity>
      </View>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <View style={[
        styles.taskContainer,
        task.completed ? styles.completedTask : null
      ]}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={onToggleCompletion}
        >
          <View style={[
            styles.checkboxInner,
            task.completed ? styles.checkboxChecked : null
          ]} />
        </TouchableOpacity>
        
        <View style={styles.taskContent}>
          <Text 
            style={[
              styles.taskTitle,
              task.completed ? styles.completedText : null
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          
          {task.description ? (
            <Text 
              style={[
                styles.taskDescription,
                task.completed ? styles.completedText : null
              ]}
              numberOfLines={2}
            >
              {task.description}
            </Text>
          ) : null}
          
          {task.dueDate ? (
            <Text style={styles.dueDate}>
              Due: {formatDate(task.dueDate)}
            </Text>
          ) : null}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#081325',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  completedTask: {
    backgroundColor: '#f9f9f955',
    opacity: 0.8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#fff',
  },
  taskContent: {
    flex: 1,
    justifyContent: 'center',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  dueDate: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '500',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom:12,
   
  },
  editAction: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginHorizontal:5,
    borderRadius:8,
  },
  deleteAction: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginHorizontal:5,
    borderRadius:8
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 10,
  },
});

export default SwipeableTaskItem;