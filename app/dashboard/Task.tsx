import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

// Define Task model
interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    userId: number;
}

// Backend API URL (Replace with your actual backend URL)
const API_URL = "http://localhost:5000/tasks";

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    // Fetch tasks from backend
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add or update a task
    const saveTask = async () => {
        if (taskTitle.trim() === "") return;
        const taskData = {
            title: taskTitle,
            description: taskDescription,
            completed: false,
            userId: 1, // Replace with actual userId from authentication
        };

        try {
            if (editingTaskId !== null) {
                // Update task
                await fetch(`${API_URL}/${editingTaskId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskData),
                });
            } else {
                // Create new task
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskData),
                });
            }
            setTaskTitle("");
            setTaskDescription("");
            setEditingTaskId(null);
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    // Toggle task completion
    const toggleTaskCompletion = async (id: number, completed: boolean) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !completed }),
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Delete a task
    const deleteTask = async (id: number) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const editTask = (task: Task) => {
        setTaskTitle(task.title);
        setTaskDescription(task.description || "");
        setEditingTaskId(task.id);
    };

    const viewTask = (task: Task) => {
        Alert.alert("Task Details", `Title: ${task.title}\nDescription: ${task.description || "No description"}\nCompleted: ${task.completed ? "Yes" : "No"}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Task Management</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Task Title"
                value={taskTitle}
                onChangeText={setTaskTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                value={taskDescription}
                onChangeText={setTaskDescription}
            />
            <Button title={editingTaskId !== null ? "Update Task" : "Add Task"} onPress={saveTask} />

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, item.completed)} onLongPress={() => viewTask(item)}>
                        <View style={[styles.taskItem, item.completed ? styles.completedTask : styles.pendingTask]}>
                            <View>
                                <Text style={styles.taskText}>{item.title}</Text>
                                <Text style={styles.taskDescription}>{item.description}</Text>
                            </View>
                            <View style={styles.actions}>
                                <Button title="Edit" onPress={() => editTask(item)} />
                                <Button title="Delete" color="red" onPress={() => deleteTask(item.id)} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
    taskItem: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    completedTask: { backgroundColor: "#c6f6d5" }, // Light green for completed tasks
    pendingTask: { backgroundColor: "#f6d6d5" }, // Light red for pending tasks
    taskText: { fontSize: 16, fontWeight: "bold" },
    taskDescription: { fontSize: 14, color: "#555" },
    actions: { flexDirection: "row", gap: 10 },
});

export default Dashboard;
