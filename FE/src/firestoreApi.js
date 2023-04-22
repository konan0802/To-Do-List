import firebase from "./firebase";

export const fetchTasks = async (callback) => {
    try {
      const getTasks = firebase.functions().httpsCallable("getTasks");
      const result = await getTasks();
      const tasks = result.data;
      callback(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
};

export const addTask = async (type, order, tasks, callback) => {
    try {
      const addTaskFunction = firebase.functions().httpsCallable("addTask");
      const result = await addTaskFunction({ type, order });
      const newTask = result.data;
      callback([...tasks, newTask].sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error adding task:", error);
    }
};

export const updateTask = async (id, updates, tasks, callback) => {
    try {
        const updateTaskFunction = firebase.functions().httpsCallable("updateTask");
        await updateTaskFunction({ id, updates });
        const updatedTasks = tasks.map(task => (task.id === id ? { ...task, ...updates } : task));
        callback(updatedTasks);
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (id, tasks, callback) => {
    try {
        const deleteTaskFunction = firebase.functions().httpsCallable("deleteTask");
        await deleteTaskFunction({ id });
        const updatedTasks = tasks.filter(task => task.id !== id);
        callback(updatedTasks);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
