import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    model: string;
    year: number;
  };
  onPress: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{car.name}</Text>
      <Text style={styles.details}>{car.model} - {car.year}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CarCard;
