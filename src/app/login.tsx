import React, { useState } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useUserStore } from '../stores/userStore';
import Loader from '../components/Loader';

export default function LoginScreen() {
  const router = useRouter();
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useUserStore();

  const handleLogin = () => {
    if (loading) return;

    setErrorMessage('');
    setLoading(true);

    login({ email, senha })
      .then(() => {
        setEmail('');
        setSenha('');

        router.replace('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
        setErrorMessage('Email ou senha inválidos.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/card.png')}
        style={styles.cardImage}
        resizeMode="contain"
      />

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

        {
          loading
            ?
          <View style={styles.loading}>
            <Loader />
          </View>
            :
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

        }


        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => navigation.navigate('create_user')}>
            <Text style={styles.linkText}>Criar novo usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Alert.alert('Recuperação', 'Funcionalidade ainda não implementada')}>
            <Text style={styles.linkText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -108
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
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  linkText: {
    color: '#5f019a',
    fontWeight: '500',
  },
  cardImage: {
    width: '100%',
    height: 180,
    marginBottom: 16,
  },
  loading: {
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
});
