import { apiUrl } from "../../api";
import { getToken } from '../../util/authToken';

const usePaymentServerConnect = (eventId, setDeadlines) => {

    const toggleDeadlineCompletion = async (supplierName, date, completed) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/updateDeadlines/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ supplierName, date, completed }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error('Server response:', responseData);
                throw new Error(responseData.message || 'Failed to update payment deadline completion status');
            }
            return responseData.event.paymentDeadlines;
        } catch (error) {
            console.error('Error:', error.message || 'Error updating payment deadline completion status.');
            throw error;
        }
    };

    const addNewPaymentDeadline = async (supplierName, date) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/addDeadlines/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    paymentDeadlines: [
                        {
                            supplierName,
                            date,
                            completed: false
                        }
                    ]
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error('Server response:', responseData);
                throw new Error(responseData.message || 'Failed to add new payment deadline');
            }
            return responseData.event.paymentDeadlines;
        } catch (error) {
            console.error('Error:', error.message || 'Error adding new payment deadline.');
            throw error;
        }
    };

    return { toggleDeadlineCompletion, addNewPaymentDeadline };
};

export default usePaymentServerConnect;
