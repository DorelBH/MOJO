import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '../../components/CheckBox';

const tasksData = [
  {
    timeframe: 'שנה לאירוע',
    tasks: ['סגירת אולם', 'סגירת דיג\'יי', 'הזמנת תקליטנים', 'בדיקת תאורה וסאונד']
  },
  {
    timeframe: 'ששה חודשים לאירוע',
    tasks: ['בחירת תפריט', 'בדיקת קייטרינג', 'הזמנת צלם']
  },
  {
    timeframe: 'שלושה חודשים לאירוע',
    tasks: ['הכנת מוזמנים', 'שליחת הזמנות להדפסה', 'קביעת מופעים חיים']
  },
  {
    timeframe: 'חודש לאירוע',
    tasks: ['שליחת הזמנות', 'שליחת אישורי הגעה', 'אישור סופי של תפריט']
  },
  {
    timeframe: 'שבוע לאירוע',
    tasks: ['ללכת לרבנות', 'איסוף שמלות וחליפות', 'פגישה אחרונה עם הקייטרינג']
  },
  {
    timeframe: 'יום לפני האירוע',
    tasks: ['בדיקת סידורי ישיבה', 'טיפול בתשלומים סופיים', 'בדיקה כללית של המקום']
  }
];

const CheckList = () => {
    const [completedTasks, setCompletedTasks] = useState({});

    const handleToggleTask = (timeframe, task) => {
        const taskKey = `${timeframe}-${task}`;
        setCompletedTasks({
            ...completedTasks,
            [taskKey]: !completedTasks[taskKey]
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>רשימת משימות לאירוע</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <TouchableOpacity activeOpacity={1}>

                {tasksData.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.header}>{section.timeframe}</Text>
                        {section.tasks.map((task, taskIndex) => {
                            const taskKey = `${section.timeframe}-${task}`;
                            return (
                                <View key={taskIndex} style={styles.taskContainer}>
                                    <CheckBox
                                        checked={!!completedTasks[taskKey]}
                                        onChange={() => handleToggleTask(section.timeframe, task)}
                                    />
                                    <Text style={[styles.taskText, completedTasks[taskKey] && styles.completedTaskText]}>
                                        {task}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,
        zIndex: 1, 
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollContent: {
        paddingBottom: 50, // כדי להוסיף רווח בתחתית התוכן הגלול
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
        backgroundColor:'#F5DEB3',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2f2f2f',
        
    },
    completedTaskText: {
        textDecorationLine: 'line-through', // קו חוצה למשימות שבוצעו
        color: '#a9a9a9', // צבע טקסט אפור למשימות שבוצעו
    },
    taskText: {
        fontSize: 18,
        textAlign: 'right',
        flex: 1,
    },
});

export default CheckList;
