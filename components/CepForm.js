import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Button from './Button'; // Importe o RedButton

const CepForm = () => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscarCep = async () => {
    if (!cep) {
      setError('Por favor, insira um CEP.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado.');
      } else {
        setEndereco(response.data);
      }
    } catch (err) {
      setError('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />

      {/* Substitua o Button pelo RedButton */}
      <Button title="Buscar CEP" onPress={buscarCep} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {endereco && (
        <View style={styles.result}>
          <Text>CEP: {endereco.cep}</Text>
          <Text>Logradouro: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>Cidade: {endereco.localidade}</Text>
          <Text>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
});

export default CepForm;