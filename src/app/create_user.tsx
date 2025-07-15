import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from 'expo-router';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUserStore } from '../stores/userStore';

export default function TelaRegistro() {

  const userStore = useUserStore();
  const navigation = useNavigation();

  const { create } = userStore;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [erroNome, setErroNome] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');

  const handleSubmit = async () => {
    let isValid = true;

    setErroNome('');
    setErroEmail('');
    setErroSenha('');
    setErroConfirmarSenha('');

    if (!nome.trim()) {
      setErroNome('Nome é obrigatório.');
      isValid = false;
    }

    if (!email.includes('@')) {
      setErroEmail('Email inválido.');
      isValid = false;
    }

    if (senha.length < 6) {
      setErroSenha('A senha deve ter no mínimo 6 caracteres.');
      isValid = false;
    }

    if (senha !== confirmarSenha) {
      setErroConfirmarSenha('As senhas não coincidem.');
      isValid = false;
    }

    if (isValid) {
      try {
        await create({ nome, email, senha, confirmarSenha });
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
          text2: 'Agora você pode fazer login 😊',
          position: 'top',
          visibilityTime: 3000,
          onHide: () => navigation.navigate('login'),
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro ao realizar cadastro!',
          text2: 'Tente novamente mais tarde! 😊',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/card.png')}
        style={styles.cardImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Registro</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        {erroNome ? <Text style={styles.errorText}>{erroNome}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {erroEmail ? <Text style={styles.errorText}>{erroEmail}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erroSenha ? <Text style={styles.errorText}>{erroSenha}</Text> : null}
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        {erroConfirmarSenha ? <Text style={styles.errorText}>{erroConfirmarSenha}</Text> : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Prosseguir</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    padding: 24,
    justifyContent: 'center',
    marginTop: -108
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#5f019a',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
});
