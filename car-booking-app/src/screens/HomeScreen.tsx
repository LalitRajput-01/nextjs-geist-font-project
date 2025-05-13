import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CarCard from '../components/CarCard';

const cars = [
  { id: '1', name: 'Toyota', model: 'Corolla', year: 2020 },
  { id: '2', name: 'Honda', model: 'Civic', year: 2019 },
  { id: '3', name: 'Ford', model: 'Focus', year: 2018 },
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [amount, setAmount] = useState(0);

  const openModal = (car: any) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setUserName('');
    setUserAddress('');
    setUserPhone('');
    setKilometers('');
    setAmount(0);
  };

  const calculateAmount = (km: string) => {
    const kmNum = parseFloat(km);
    if (!isNaN(kmNum)) {
      setAmount(kmNum * 10);
    } else {
      setAmount(0);
    }
  };

  const handleBooking = () => {
    if (!userName || !userAddress || !userPhone || !kilometers) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Booking Confirmed', `You have booked ${selectedCar.name} for ${kilometers} km. Amount: ₹${amount}`);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Cars</Text>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarCard car={item} onPress={() => openModal(item)} />}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book {selectedCar?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="User Address"
              value={userAddress}
              onChangeText={setUserAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="User Phone"
              keyboardType="phone-pad"
              value={userPhone}
              onChangeText={setUserPhone}
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              placeholder="Kilometers to run"
              keyboardType="numeric"
              value={kilometers}
              onChangeText={(text) => {
                setKilometers(text);
                calculateAmount(text);
              }}
            />
            <Text style={styles.amount}>Amount: ₹{amount}</Text>
            <View style={styles.buttonRow}>
              <Button title="Cancel" onPress={closeModal} color="#888" />
              <Button title="Book" onPress={handleBooking} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  amount: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
