import { apiUrl } from "../../api";
import { getToken } from '../../util/authToken';
import * as Contacts from 'expo-contacts';

const useGuestServerConnect = (eventId, setSelectedContacts, setAllContacts, setFilteredContacts) => {
    if (!eventId) {
        throw new Error('eventId is required');
    }

    const addGuest = async (name, phone) => {
        try {
            const token = await getToken();
            const response = await fetch(`${apiUrl}/api/events/addGuest/${eventId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, phone }),
            });
            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Failed to add guest');
            }
            const responseData = await response.json();
            setSelectedContacts(prevGuests => [...prevGuests, { name, phone }]);
        } catch (error) {
            console.error('Error:', error.message || 'Error adding guest.');
        }
    };

    const fetchContacts = async () => {
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                const contactList = data.map(contact => ({
                    id: contact.id,
                    name: contact.name || 'Unnamed Contact',
                    phoneNumbers: contact.phoneNumbers,
                }));

                const sortedContacts = contactList.sort((a, b) => {
                    const containsHebrew = (str) => {
                        return /[\u0590-\u05FF]/.test(str);
                    };

                    const isHebrewA = containsHebrew(a.name);
                    const isHebrewB = containsHebrew(b.name);

                    if (isHebrewA && !isHebrewB) return -1;
                    if (!isHebrewA && isHebrewB) return 1;

                    return a.name.localeCompare(b.name);
                });

                setAllContacts(sortedContacts);
                setFilteredContacts(sortedContacts);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error.message || 'Error fetching contacts.');
        }
    };

    const searchContacts = (searchText, allContacts) => {
        const filtered = allContacts.filter(contact =>
            (contact.name && contact.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (contact.phoneNumbers && contact.phoneNumbers.length > 0 && contact.phoneNumbers[0].number && contact.phoneNumbers[0].number.includes(searchText))
        );
        setFilteredContacts(filtered);
    };

    return {
        addGuest,
        fetchContacts,
        searchContacts,
    };
};

export default useGuestServerConnect;