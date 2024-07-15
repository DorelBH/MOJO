import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { eventPlanningHistory } from '../../data/eventPlanningHistory';

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const MODEL_NAME = 'gemini-1.0-pro';
const API_KEY = 'AIzaSyC-LGfe1ktetDxnvsYctGuwlwxtsUP7uws';

const ChatbotScreen = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [chat, setChat] = useState(null); // State to hold chat instance
  const [chatHistory, setChatHistory] = useState([]); // State to hold chat history
  const scrollViewRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];

        const newChat = model.startChat({
          generationConfig,
          safetySettings,
          history: eventPlanningHistory, // Use event planning history
        });

        // Set chat instance to state
        setChat(newChat);
      } catch (error) {
        Alert.alert("Error", "Failed to initialize chat. Please try again later.");
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();

    // Cleanup function to close the chat session on unmount
    return () => {
      if (chat && chat.close) {
        // Check if chat and chat.close are defined
        chat.close();
      }
    };
  }, []);

  const sendMessageOf = async () => {
    if (!chat) return; // Ensure chat instance is available

    // Generate a temporary ID for the "typing..." message
    const tempId = Date.now();

    // Add message to chat history and a temporary "typing..." response
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: 'user', text: message, id: tempId - 1 },
      { role: 'bot', text: '...', id: tempId },
    ]);

    setMessage('');

    try {
      const result = await chat.sendMessage(message);
      const response = result.response;

      // Update chat history: replace "typing..." with actual response
      setChatHistory((prevHistory) =>
        prevHistory.map((msg) =>
          msg.id === tempId ? { ...msg, text: response.text() } : msg
        )
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again later.");
      console.error("Error sending message:", error);
    }
  };

  // Function to focus on the latest message
  const focusOnLatestMessage = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>צ'אט תכנון אירועים</Text>
      <View style={styles.line}></View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={focusOnLatestMessage} // Focus on latest message when content size changes
      >
        {/* Render chat history */}
        {chatHistory.map((msg, index) => (
          <View
            key={index}
            style={
              msg.role === 'user'
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            <Text
              style={
                msg.role === 'user' ? styles.userMessage : styles.botMessage
              }
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMessage}
          value={message}
          placeholder="הקלד את ההודעה שלך כאן..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessageOf}>
          <Text style={styles.sendButtonText}>שלח</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 25,
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  chatContainer: {
    flexGrow: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderBottomRightRadius: 0, // Curved border at bottom right for user message
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderBottomLeftRadius: 0, // Curved border at bottom left for bot message
  },
  userMessage: {
    color: '#000',
    textAlign: 'right',
  },
  botMessage: {
    color: '#000',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    marginBottom: 25,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#0066ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ChatbotScreen;
