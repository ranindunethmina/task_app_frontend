import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegister() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (username && email && password) {
      // Here you would usually make a request to your backend to register the user
      alert("Registration Successful");
      router.push('/login');  // Redirect to login after successful registration
    } else {
      alert("Please fill all fields");
    }
  }

  return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Register</Text>
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
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.textFields}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
        />
        <TextInput
            style={styles.textFields}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.registerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.registerLink}>Login</Text>
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
  loginContainer: {
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
