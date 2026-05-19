import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../App';
import { apiRequest } from '../api/client';

export function SignInScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      signIn(data.accessToken, data.user.id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Connect</Text>
      <Text style={styles.subtitle}>Connect with campus life and events</Text>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>
      <Text style={styles.narrative}>Built for polished campus experiences with fast, secure access.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F24',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A7B0CB',
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#121B38',
    color: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#5B7FFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: '#FF6B6B',
    marginBottom: 12,
  },
  narrative: {
    color: '#88A0CC',
    marginTop: 20,
    textAlign: 'center',
  },
});
