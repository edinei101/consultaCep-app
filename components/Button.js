import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button1 = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff0000', // Cor de fundo vermelha
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff', // Cor do texto branco
    fontSize: 16,
  },
});

export default Button1;