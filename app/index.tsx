import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (username === 'User' && password === 'user') {
      router.replace('/dashboard');
    } else {
      alert("Invalid credentials");
    }
  }

  function handleRegister() {
    router.replace('/register');
  }

  return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
            style={styles.textFields}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <TextInput
            style={styles.textFields}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  textFields: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    backgroundColor: "#0066cc",
    paddingVertical: 12,
    width: '100%',
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  registerLink: {
    fontSize: 16,
    color: "#0066cc",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
