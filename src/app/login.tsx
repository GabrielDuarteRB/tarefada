import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserStore } from '../stores/userStore';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useUserStore();

  const handleLogin = () => {
    setErrorMessage('');

    login({ email, senha })
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErrorMessage('Email ou senha inválidos.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  errorText: {
    color: '#d00',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f2632b',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  forgot: {
    color: '#000',
    fontSize: 13,
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
