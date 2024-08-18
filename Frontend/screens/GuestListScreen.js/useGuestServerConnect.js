import { useState } from 'react';
import { apiUrl } from "../../api";
import { getToken } from '../../util/authToken';

const useGuestServerConnect = (eventId, setGuests, setSelectedGuests) => {
  
  const fetchGuests = async () => {
    if (!eventId) return;
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/api/events/getGuests/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setGuests(data.guests);
      } else {
        throw new Error(data.message || 'Failed to fetch guests');
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const sendNotificationToGuests = async () => {
    const token = await getToken();
    try {
      const response = await fetch(`${apiUrl}/api/events/notifyGuests/${eventId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Notifications sent successfully');
      } else {
        throw new Error(data.message || 'Failed to send notifications');
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
      alert('Error sending notifications');
    }
  };

  const removeSelectedGuests = async (selectedGuests) => {
    const token = await getToken();

    try {
        for (const guest of selectedGuests) {
            const response = await fetch(`${apiUrl}/api/events/removeGuest/${eventId}/${guest.phone}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to remove guest');
            }
        }

        setGuests((prevGuests) => prevGuests.filter((guest) => !selectedGuests.includes(guest)));
        setSelectedGuests([]);
        alert('Guest(s) removed successfully');
    } catch (error) {
        console.error('Error removing guests:', error);
        alert('Error removing guests');
    }
  };

  return { fetchGuests, sendNotificationToGuests, removeSelectedGuests };
};

export default useGuestServerConnect;
