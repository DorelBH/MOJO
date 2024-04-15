import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const DeleteModal = ({ modalVisible, setModalVisible, handleDelete }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.addModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>האם אתה בטוח שברצונך למחוק?</Text>
          <CustomButton
            text="כן"
            onPress={() => {
              handleDelete();
              setModalVisible(false);
            }}
            type="CALCULATE"
          />
          <CustomButton
            text="לא"
            onPress={() => setModalVisible(false)}
            type="CALCULATE"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '90%', 
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  }
});

export default DeleteModal;
