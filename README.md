# Todo
Assessment task.
![IMG-20250411-WA0013](https://github.com/user-attachments/assets/51b1708f-bcff-46c8-9f62-a857b07156b7)
[IMG-20250411-WA0012](https://github.com/user-attachments/assets/e868dc4a-7227-4f46-9862-58cdeb5dbe4d)
![IMG-20250411-WA0011](https://github.com/user-attachments/assets/f5add178-db5a-4096-a963-40497648b322)
[IMG-20250411-WA0010](https://github.com/user-attachments/assets/31c5710e-3ff2-4ca3-b7f8-93fe6d676c30)

https://github.com/user-attachments/assets/b5b00fad-dfa9-4347-9417-f119b5f81b03



### Core Features
- User authentication (dummy login)
- Task listing with filter options (All / Completed / Pending)
- CRUD operations on tasks (Create, Read, Update, Delete)
- Local data persistence using AsyncStorage
- Empty state handling
- Swipeable delete and edit actions
- Due date for tasks
- Form validation
- Responsive and aesthetic UI design

## App Architecture

- **State Management:**
  - Used `AuthContext` with React Context API to manage authentication state globally.
  - Created a custom `useTasks` hook to handle all task-related logic (CRUD, filtering, etc.).

- **Navigation:**
  - Implemented using React Navigation via `AppNavigator.js` to switch between authentication and main app screens.

- **Data Persistence:**
  - Tasks and authentication state are stored locally using **AsyncStorage**.
  - All storage operations are abstracted into `utils/storage.js` for cleaner code.

- **UI & UX:**
  - Built with React Native and Expo for cross-platform support.
  - Included swipeable task items, due date picker, and form validation.
  - Used `FlatList` for performance-efficient rendering with pull-to-refresh and memoization to avoid unnecessary re-renders.


## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository
   clone this repo
   cd Todo

2. Install dependencies
   npm install

3. Start the Expo development server  
   npx expo start


## Technologies Used
- React Native
- Expo
- React Navigation
- AsyncStorage for data persistence
- React Native Gesture Handler for swipeable actions
- DateTimePicker for due date selection
