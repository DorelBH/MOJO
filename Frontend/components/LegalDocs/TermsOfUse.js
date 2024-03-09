import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';

const TermsOfUse = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Terms of Use</Text>
                    <Text style={styles.content}>
                        By using this application, you agree to the following terms of use:
                    </Text>
                    <Text style={styles.content}>
                        - You will use the application for lawful purposes only.
                    </Text>
                    <Text style={styles.content}>
                        - You will not use the application to harm others or violate their rights.
                    </Text>
                    <Text style={styles.content}>
                        - You will not engage in any activity that interferes with the proper functioning of the application.
                    </Text>
                    <Text style={styles.content}>
                        - You understand that the application may collect and use your personal information as described in the Privacy Policy.
                    </Text>
                    <Text style={styles.content}>
                        - The information provided in the application is for general informational purposes only and should not be construed as professional advice.
                    </Text>
                    <Text style={styles.content}>
                        - We reserve the right to modify, suspend, or terminate the application or your access to it at any time without notice.
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

export default TermsOfUse;
