import axios from 'axios';

export const SelectAdapter_Currency = [
    { value: 0, label: 'United States Dollar (USD)' },
    { value: 1, label: 'Euro (EUR)' },
    { value: 2, label: 'Japanese Yen (JPY)' },
    { value: 3, label: 'British Pound (GBP)' },
    { value: 4, label: 'Australian Dollar (AUD)' },
    { value: 5, label: 'Canadian Dollar (CAD)' },
    { value: 6, label: 'Swiss Franc (CHF)' },
    { value: 7, label: 'Vietnamese Dong (VND)' },
    { value: 8, label: 'Singapore Dollar (SGD)' }
];

export const getData = async () => {
    try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/c10625b1c049c8b59265c56b/latest/USD');

        const currency = [
            { id: 0, value: 'USD', label: 'United States Dollar' },
            { id: 1, value: 'EUR', label: 'Euro' },
            { id: 2, value: 'JPY', label: 'Japanese Yen' },
            { id: 3, value: 'GBP', label: 'British Pound' },
            { id: 4, value: 'AUD', label: 'Australian Dollar' },
            { id: 5, value: 'CAD', label: 'Canadian Dollar' },
            { id: 6, value: 'CHF', label: 'Swiss Franc' },
            { id: 7, value: 'VND', label: 'Vietnamese Dong' },
            { id: 8, value: 'SGD', label: 'Singapore Dollar' },
        ];

        const updatedCurrency = currency.map(curr => ({
            ...curr,
            rate: response.data.conversion_rates[curr.value] || null
        }));

        return { currency: updatedCurrency, time: response.data.time_last_update_utc.slice(0, -9) };
    } catch (error) {
        return;
    }
}
