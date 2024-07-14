import { apiUrl } from "../../api";
import { getToken } from '../../util/authToken';

const useTaskServerConnect = (eventId, setTasks) => {

    const toggleTaskCompletion = async (timeframe, label, completed) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/updateTaskCompletion/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ timeframe, label, completed }),
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to update task completion status');
            }

            const responseData = await response.json();
            return responseData.event.checkLists;
        } catch (error) {
            console.error('Error:', error.message || 'Error updating task completion status.');
            throw error;
        }
    };

    const addNewTask = async (newTimeframe, newFieldTitle) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/addTasks/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    checkLists: [
                        {
                            timeframe: newTimeframe,
                            tasks: [{ label: newFieldTitle, completed: false }]
                        }
                    ]
                }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to add new task');
            }

            const responseData = await response.json();
            return responseData.event.checkLists;
        } catch (error) {
            console.error('Error:', error.message || 'Error adding new task.');
            throw error;
        }
    };

    return { toggleTaskCompletion, addNewTask };
};

export default useTaskServerConnect;
