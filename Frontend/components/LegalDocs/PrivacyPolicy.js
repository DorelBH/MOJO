import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Privacy Policy</Text>
                    <Text style={styles.content}>
                        Our privacy policy explains how we collect, use, and protect your personal information.
                        We value your privacy and strive to maintain the confidentiality of your personal data.
                        By using our application, you consent to the terms outlined in this privacy policy.
                        For more details, please read our full privacy policy below.
                    </Text>
                    <Text style={styles.closeButton} onPress={onClose}>Close</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
        color: '#007BFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PrivacyPolicy;
