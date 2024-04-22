import { apiUrl } from "../../api";
import { getToken } from '../../util/authToken';

const useCostServerConnect = (eventId, eventCosts, setEventCosts, setModalVisible, newFieldTitle,setNewFieldTitle) => {

    const updateCost = async (key, newData) => {
        try {
            const token = await getToken();
            const costsArray = Object.entries(eventCosts).map(([k, v], index) => ({
                index,
                key: k,
                ...v
            }));
            const costToUpdate = costsArray.find(cost => cost.key === key);
            if (!costToUpdate) {
                throw new Error("Cost not found with the given key");
            }
    
            // הוספת בדיקה לערך סכום ריק והגדרתו לריק
            const updatedData = {
                ...newData,
                cost: newData.cost || ''
            };
    
            const response = await fetch(`${apiUrl}/api/events/updateCosts/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ index: costToUpdate.index, newCostData: updatedData }),
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to update cost');
            }
            setEventCosts(prevCosts => ({
                ...prevCosts,
                [key]: { ...prevCosts[key], ...updatedData }
            }));
        } catch (error) {
            console.error('Error:', error.message || 'Error updating cost.');
        }
    };
    
    const onDeleteCost = async (key) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/deleteCost/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ index: key }) 
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to delete cost');
            }
            // עדכון ה-state באופן מידי לאחר מחיקה מוצלחת
            setEventCosts(prevCosts => {
                const updatedCosts = { ...prevCosts };
                delete updatedCosts[key];
                return updatedCosts;
            });
        } catch (error) {
            console.error('Error:', error.message || 'Error deleting cost.');
        }
    };
    
    
    
    const handleAddNewField = async () => {
        const token = await getToken();
        if (newFieldTitle) {
            try {
                const response = await fetch(`${apiUrl}/api/events/addCosts/${eventId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        costs: [{ label: newFieldTitle, cost: '0' }]
                    }),
                });
                
                if (!response.ok) {
                    setModalVisible(false);
                    const responseData = await response.json();
                    throw new Error(responseData.message || 'Failed to add new cost');
                }
                setEventCosts(prevCosts => ({
                    ...prevCosts,
                    [newFieldTitle]: { label: newFieldTitle, cost: '' }
                }));
                setNewFieldTitle('');
                setModalVisible(false);
            } catch (error) {
                console.error('Error:', error.message || 'error adding new cost.');
            }
        }
    };

    return { updateCost,  onDeleteCost, handleAddNewField };
};

export default useCostServerConnect;
