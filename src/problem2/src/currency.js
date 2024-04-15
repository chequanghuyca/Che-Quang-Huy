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
    { value: 8, label: 'Singapore Dollar (SGD)' },
    { value: 9, label: 'Chinese Yuan (CNY)' },
    { value: 10, label: 'South Korean Won (KRW)' },
    { value: 11, label: 'Malaysian Ringgit (MYR)' },
    { value: 12, label: 'Thai Baht (THB)' },
    { value: 13, label: 'Indonesian Rupiah (IDR)' },
    { value: 14, label: 'Indian Rupee (INR)' },
    { value: 15, label: 'Philippine Peso (PHP)' },
    { value: 16, label: 'Hong Kong Dollar (HKD)' },
    { value: 17, label: 'Brazilian Real (BRL)' },
    { value: 18, label: 'Mexican Peso (MXN)' },
    { value: 19, label: 'Russian Ruble (RUB)' },
    { value: 20, label: 'South African Rand (ZAR)' },
    { value: 21, label: 'Turkish Lira (TRY)' },
    { value: 22, label: 'United Arab Emirates Dirham (AED)' },
    { value: 23, label: 'Saudi Riyal (SAR)' },
    { value: 24, label: 'Qatari Riyal (QAR)' },
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
            { id: 9, value: 'CNY', label: 'Chinese Yuan' },
            { id: 10, value: 'KRW', label: 'South Korean Won' },
            { id: 11, value: 'MYR', label: 'Malaysian Ringgit' },
            { id: 12, value: 'THB', label: 'Thai Baht' },
            { id: 13, value: 'IDR', label: 'Indonesian Rupiah' },
            { id: 14, value: 'INR', label: 'Indian Rupee' },
            { id: 15, value: 'PHP', label: 'Philippine Peso' },
            { id: 16, value: 'HKD', label: 'Hong Kong Dollar' },
            { id: 17, value: 'BRL', label: 'Brazilian Real' },
            { id: 18, value: 'MXN', label: 'Mexican Peso' },
            { id: 19, value: 'RUB', label: 'Russian Ruble' },
            { id: 20, value: 'ZAR', label: 'South African Rand' },
            { id: 21, value: 'TRY', label: 'Turkish Lira' },
            { id: 22, value: 'AED', label: 'United Arab Emirates Dirham' },
            { id: 23, value: 'SAR', label: 'Saudi Riyal' },
            { id: 24, value: 'QAR', label: 'Qatari Riyal' },
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
