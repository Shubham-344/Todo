import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native';
import { useTasks } from '../hooks/useTasks';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskFormScreen = ({ navigation, route }) => {
  const { task } = route.params || {};
  const isEditing = !!task;
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task.dueDate) : null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [titleError, setTitleError] = useState('');
  
  const { createTask, editTask } = useTasks();

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Task' : 'Add New Task',
    });
  }, [navigation, isEditing]);

  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('Task title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      if (isEditing) {
        
        const updatedTask = {
          ...task,
          title,
          description,
          dueDate: dueDate ? dueDate.toISOString() : null
        };
        
        const success = await editTask(updatedTask);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        } else {
          Alert.alert('Error', 'Failed to update task. Please try again.');
        }
      } else {
        const newTask = {
          title,
          description,
          completed: false,
          dueDate: dueDate ? dueDate.toISOString() : null,
          createdAt: new Date().toISOString()
        };
        
        const success = await createTask(newTask);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        } else {
          Alert.alert('Error', 'Failed to create task. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Task Title <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.input, titleError ? styles.inputError : null]}
                placeholder="Enter task title"
                value={title}
                onChangeText={setTitle}
              />
              {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter task description (optional)"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={dueDate ? styles.dateText : styles.placeholderText}>
                  {dueDate ? formatDate(dueDate) : 'Set due date (optional)'}
                </Text>
              </TouchableOpacity>
              
              {dueDate && (
                <TouchableOpacity 
                  style={styles.clearDateButton}
                  onPress={() => setDueDate(null)}
                >
                  <Text style={styles.clearDateText}>Clear Date</Text>
                </TouchableOpacity>
              )}
              
              {showDatePicker && (
                <DateTimePicker
                  value={dueDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  themeVariant='dark'
                  accentColor='#18243c'
                />
              )}
            </View>
            
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <Text style={styles.saveButtonText}>
                  {isEditing ? 'Update Task' : 'Create Task'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18243c',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
    fontWeight: '500',
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    minHeight: 100,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
  },
  datePickerButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  placeholderText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  clearDateButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  clearDateText: {
    color: '#e74c3c',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#7f8c8d',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#ffffff99',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskFormScreen;