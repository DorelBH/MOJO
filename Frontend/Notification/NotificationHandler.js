import React, { useEffect } from 'react';
import { calculateTimeLeft } from '../util/timeUtils';
import notificationTimeframes from './NotificationTimeframes';
import * as Notifications from 'expo-notifications';
import { getToken } from "../util/authToken";
import { apiUrl } from "../api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationHandler = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('You need to enable notifications for this app!');
          return false;
        }
      }
      return true;
    };

    requestPermissions();

    const interval = setInterval(() => {
      fetchAllEventsAndCheckNotifications();
    }, 86400000); // בדיקה כל 24 שעות (86400000 מילישניות)

    return () => clearInterval(interval);
  }, []);

  const fetchAllEventsAndCheckNotifications = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/events/getEvent`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);
        if (response.ok) {
          data.events.forEach(event => {
            const { days, hours, minutes } = calculateTimeLeft(event.eventDate);
            checkAndSendNotification(days, hours, minutes, event.checkLists, event);
          });
        } else {
          throw new Error(data.message || 'Failed to fetch events data');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } catch (error) {
      console.error('Error fetching events data:', error);
    }
  };

  const checkAndSendNotification = (days, hours, minutes, checkLists, event) => {
    checkLists.forEach((section) => {
      notificationTimeframes.forEach((timeframe) => {
        if (section.timeframe.includes(timeframe.label) && days === timeframe.days) {
          sendNotification(section.timeframe, event);
        }
      });
    });
  };

  const sendNotification = async (label, event) => {
    let eventTitle = event.eventType;
    if (event.eventType === "חתונה" || event.eventType === "חינה") {
      eventTitle = `${event.eventType} של ${event.groomName} & ${event.brideName}`;
    } else {
      eventTitle = `${event.eventType} של ${event.name}`;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${eventTitle} : ${label}`,
        body: `נותר ${label}. יש לבצע את המשימות.`,
      },
      trigger: { seconds: 1 },
    });
  };

  return null;
};

export default NotificationHandler;
