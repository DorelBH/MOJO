import { useState, useEffect } from 'react';
import { apiUrl } from "../api";
import { getToken } from '../util/authToken';

const useProviderServerConnect = (providerType, selectedRegions = null, settlements = null) => {
  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${apiUrl}/api/events/providers/${providerType}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to fetch providers.');
        }

        // If selectedRegions is provided, filter the providers based on it
        let filteredProviders = responseData;
        if (selectedRegions && settlements) {
          filteredProviders = responseData.filter(provider => {
            let address = provider.address.trim();
            if (address.includes(',')) {
              address = address.split(',').pop().trim(); // Extract the city name after the comma
            }
            const included = selectedRegions.some(region => {
              return settlements[region]?.includes(address);
            });
            return included;
          });
        }

        setProviders(filteredProviders);
      } catch (error) {
        console.error('Failed to fetch providers:', error.message);
      }
    };

    fetchProviders();
  }, [providerType, selectedRegions, settlements]);

  return { providers, currentPage, setCurrentPage };
};

export default useProviderServerConnect;
