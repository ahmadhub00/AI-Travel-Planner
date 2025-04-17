/* 
 import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CurrencyExchange() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([
    "USD", // United States Dollar
    "EUR", // Euro
    "GBP", // British Pound
    "JPY", // Japanese Yen
    "CAD", // Canadian Dollar
    "AUD", // Australian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan
    "INR", // Indian Rupee
    "RUB", // Russian Ruble
    "SGD", // Singapore Dollar
    "NZD", // New Zealand Dollar
    "MXN", // Mexican Peso
    "HKD", // Hong Kong Dollar
    "SEK", // Swedish Krona
    "NOK", // Norwegian Krone
    "KRW", // South Korean Won
    "TRY", // Turkish Lira
    "BRL", // Brazilian Real
    "ZAR", // South African Rand
    "DKK", // Danish Krone
    "PLN", // Polish Zloty
    "THB", // Thai Baht
    "AED", // United Arab Emirates Dirham
    "SAR", // Saudi Riyal
    "MYR", // Malaysian Ringgit
    "IDR", // Indonesian Rupiah
    "PHP", // Philippine Peso
    "CZK", // Czech Koruna
    "PKR", // Pakistani Ruppe
    "ARS", // Argentine Peso
    "CLP", // Chilean Peso
    "EGP", // Egyptian Pound
    "UAH", // Ukrainian Hryvnia
    "HUF", // Hungarian Forint
    "KWD", // Kuwaiti Dinar
    "VND", // Vietnamese Dong
    "RON", // Romanian Leu
    "QAR", // Qatari Riyal
    "COP"  // Colombian Peso
  ]);const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert currency whenever input values change
  useEffect(() => {
    const timer = setTimeout(() => {
      convertCurrency();
    }, 500); // Add a small delay to avoid too many API calls while typing
    
    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  // We'll use a free alternative API that doesn't require an API key
  const convertCurrency = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }
    
    setLoading(true);
    const url = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    console.log("Calling free API:", url);
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response received");
        
        if (data && data.rates && data.rates[toCurrency]) {
          const rate = data.rates[toCurrency];
          const calculatedResult = parseFloat(amount) * rate;
          setResult(calculatedResult.toFixed(2));
        } else {
          console.log("API response didn't contain expected rates");
          Alert.alert("Conversion Error", "Unable to fetch conversion rate");
        }
      })
      .catch((err) => {
        console.log("Error converting currency:", err);
        Alert.alert("Error", "Something went wrong with the conversion");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Try alternative API as fallback
  const convertCurrencyFallback = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }
    
    setLoading(true);
    const url = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency}`;
    Alert.alert(
      "API Key Required", 
      "This fallback option requires you to register for a free API key at exchangerate-api.com and replace 'YOUR_API_KEY' in the code."
    );
    setLoading(false);
  };
    // Function to get currency name with code
    const getCurrencyLabel = (code) => {
        const currencyNames = {
          "USD": "USD - US Dollar",
          "EUR": "EUR - Euro",
          "GBP": "GBP - British Pound",
          "JPY": "JPY - Japanese Yen",
          "CAD": "CAD - Canadian Dollar",
          "AUD": "AUD - Australian Dollar",
          "CHF": "CHF - Swiss Franc",
          "CNY": "CNY - Chinese Yuan",
          "INR": "INR - Indian Rupee",
          "RUB": "RUB - Russian Ruble",
          "SGD": "SGD - Singapore Dollar",
          "NZD": "NZD - New Zealand Dollar",
          "MXN": "MXN - Mexican Peso",
          "HKD": "HKD - Hong Kong Dollar",
          "SEK": "SEK - Swedish Krona",
          "NOK": "NOK - Norwegian Krone",
          "KRW": "KRW - South Korean Won",
          "TRY": "TRY - Turkish Lira",
          "BRL": "BRL - Brazilian Real",
          "ZAR": "ZAR - South African Rand",
          "DKK": "DKK - Danish Krone",
          "PLN": "PLN - Polish Zloty",
          "THB": "THB - Thai Baht",
          "AED": "AED - UAE Dirham",
          "SAR": "SAR - Saudi Riyal",
          "MYR": "MYR - Malaysian Ringgit",
          "IDR": "IDR - Indonesian Rupiah",
          "PHP": "PHP - Philippine Peso",
          "CZK": "CZK - Czech Koruna",
          "PKR": "PKR - Pakistani Ruppe",
          "ARS": "ARS - Argentine Peso",
          "CLP": "CLP - Chilean Peso",
          "EGP": "EGP - Egyptian Pound",
          "UAH": "UAH - Ukrainian Hryvnia",
          "HUF": "HUF - Hungarian Forint",
          "KWD": "KWD - Kuwaiti Dinar",
          "VND": "VND - Vietnamese Dong",
          "RON": "RON - Romanian Leu",
          "QAR": "QAR - Qatari Riyal",
          "COP": "COP - Colombian Peso"
        };
        
        return currencyNames[code] || code;
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      <View style={styles.row}>
        <Picker
          selectedValue={fromCurrency}
          onValueChange={(itemValue) => setFromCurrency(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
            dropdownIconColor="#2c6bed"
        >
          {currencies.map((currency) => (
            <Picker.Item
            label={getCurrencyLabel(currency)}
              value={currency}
              key={`from-${currency}`}
               color="grey" 
                 />
          ))}
        </Picker>

        <Text style={styles.arrow}>→</Text>

        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
          style={[styles.picker, {color: '#2c6bed'}]}
        >
          {currencies.map((currency) => (
            <Picker.Item 
            label={getCurrencyLabel(currency)}
            value={currency}
             key={`to-${currency}`}
              color="grey"/>
          ))}
        </Picker>
      </View>


      {loading ? (
        <ActivityIndicator size="large" color="#2c6bed"  style={{ marginTop: 20 }} />
      ) : (
        result && (
          <Text style={styles.result}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </Text>
        )
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Using free open exchange rates API
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  picker: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 50,
  },
  arrow: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  result: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  infoText: {
    color: "#888",
    fontSize: 14,
  }
}); 

 */
/* import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function CurrencyExchange() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = [
    "USD", // United States Dollar
    "EUR", // Euro
    "GBP", // British Pound
    "JPY", // Japanese Yen
    "CAD", // Canadian Dollar
    "AUD", // Australian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan
    "INR", // Indian Rupee
    "RUB", // Russian Ruble
    "SGD", // Singapore Dollar
    "NZD", // New Zealand Dollar
    "MXN", // Mexican Peso
    "HKD", // Hong Kong Dollar
    "SEK", // Swedish Krona
    "NOK", // Norwegian Krone
    "KRW", // South Korean Won
    "TRY", // Turkish Lira
    "BRL", // Brazilian Real
    "ZAR", // South African Rand
    "DKK", // Danish Krone
    "PLN", // Polish Zloty
    "THB", // Thai Baht
    "AED", // United Arab Emirates Dirham
    "SAR", // Saudi Riyal
    "MYR", // Malaysian Ringgit
    "IDR", // Indonesian Rupiah
    "PHP", // Philippine Peso
    "CZK", // Czech Koruna
    "PKR", // Pakistani Ruppe
    "ARS", // Argentine Peso
    "CLP", // Chilean Peso
    "EGP", // Egyptian Pound
    "UAH", // Ukrainian Hryvnia
    "HUF", // Hungarian Forint
    "KWD", // Kuwaiti Dinar
    "VND", // Vietnamese Dong
    "RON", // Romanian Leu
    "QAR", // Qatari Riyal
    "COP"  // Colombian Peso
  ];

  // Convert currency whenever input values change
  useEffect(() => {
    const timer = setTimeout(() => {
      convertCurrency();
    }, 500); // Add a small delay to avoid too many API calls while typing
    
    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  // Function to convert currency
  const convertCurrency = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      // Don't show error when empty, just clear the result
      if (!amount) {
        setResult(null);
        return;
      }
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }
    
    setLoading(true);
    const url = `https://open.er-api.com/v6/latest/${fromCurrency}`;
    console.log("Calling free API:", url);
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response received");
        
        if (data && data.rates && data.rates[toCurrency]) {
          const rate = data.rates[toCurrency];
          const calculatedResult = parseFloat(amount) * rate;
          setResult(calculatedResult.toFixed(2));
        } else {
          console.log("API response didn't contain expected rates");
          Alert.alert("Conversion Error", "Unable to fetch conversion rate");
        }
      })
      .catch((err) => {
        console.log("Error converting currency:", err);
        Alert.alert("Error", "Something went wrong with the conversion");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to get currency name with code
  const getCurrencyLabel = (code) => {
    const currencyNames = {
      "USD": "USD - US Dollar",
      "EUR": "EUR - Euro",
      "GBP": "GBP - British Pound",
      "JPY": "JPY - Japanese Yen",
      "CAD": "CAD - Canadian Dollar",
      "AUD": "AUD - Australian Dollar",
      "CHF": "CHF - Swiss Franc",
      "CNY": "CNY - Chinese Yuan",
      "INR": "INR - Indian Rupee",
      "RUB": "RUB - Russian Ruble",
      "SGD": "SGD - Singapore Dollar",
      "NZD": "NZD - New Zealand Dollar",
      "MXN": "MXN - Mexican Peso",
      "HKD": "HKD - Hong Kong Dollar",
      "SEK": "SEK - Swedish Krona",
      "NOK": "NOK - Norwegian Krone",
      "KRW": "KRW - South Korean Won",
      "TRY": "TRY - Turkish Lira",
      "BRL": "BRL - Brazilian Real",
      "ZAR": "ZAR - South African Rand",
      "DKK": "DKK - Danish Krone",
      "PLN": "PLN - Polish Zloty",
      "THB": "THB - Thai Baht",
      "AED": "AED - UAE Dirham",
      "SAR": "SAR - Saudi Riyal",
      "MYR": "MYR - Malaysian Ringgit",
      "IDR": "IDR - Indonesian Rupiah",
      "PHP": "PHP - Philippine Peso",
      "CZK": "CZK - Czech Koruna",
      "PKR": "PKR - Pakistani Ruppe",
      "ARS": "ARS - Argentine Peso",
      "CLP": "CLP - Chilean Peso",
      "EGP": "EGP - Egyptian Pound",
      "UAH": "UAH - Ukrainian Hryvnia",
      "HUF": "HUF - Hungarian Forint",
      "KWD": "KWD - Kuwaiti Dinar",
      "VND": "VND - Vietnamese Dong",
      "RON": "RON - Romanian Leu",
      "QAR": "QAR - Qatari Riyal",
      "COP": "COP - Colombian Peso"
    };
    
    return currencyNames[code] || code;
  };

  // Render item for the FlatList
  const renderCurrencyItem = (item, setSelectedCurrency, closeDropdown) => {
    return (
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => {
          setSelectedCurrency(item);
          closeDropdown();
        }}
      >
        <Text style={styles.dropdownItemText}>{getCurrencyLabel(item)}</Text>
      </TouchableOpacity>
    );
  };

  // Custom dropdown selector component
  const CurrencySelector = ({ value, label, onPress }) => (
    <TouchableOpacity style={styles.selectorButton} onPress={onPress}>
      <Text style={styles.selectorText}>{getCurrencyLabel(value)}</Text>
      <Text style={styles.dropdownArrow}>▼</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      <View style={styles.row}>
        <View style={styles.selectorContainer}>
          <CurrencySelector 
            value={fromCurrency} 
            label="From" 
            onPress={() => setShowFromDropdown(true)} 
          />
        </View>

        <Text style={styles.arrow}>→</Text>

        <View style={styles.selectorContainer}>
          <CurrencySelector 
            value={toCurrency} 
            label="To" 
            onPress={() => setShowToDropdown(true)} 
          />
        </View>
      </View>

      /* From Currency Modal 
      <Modal
        visible={showFromDropdown}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity onPress={() => setShowFromDropdown(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              renderItem={({item}) => renderCurrencyItem(
                item, 
                setFromCurrency, 
                () => setShowFromDropdown(false)
              )}
              style={styles.dropdownList}
            />
          </View>
        </View>
      </Modal>

      {/* To Currency Modal 
      <Modal
        visible={showToDropdown}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity onPress={() => setShowToDropdown(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item}
              renderItem={({item}) => renderCurrencyItem(
                item, 
                setToCurrency, 
                () => setShowToDropdown(false)
              )}
              style={styles.dropdownList}
            />
          </View>
        </View>
      </Modal>

      {loading ? (
        <ActivityIndicator size="large" color="#2c6bed" style={{ marginTop: 20 }} />
      ) : (
        result && (
          <Text style={styles.result}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </Text>
        )
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Using free open exchange rates API
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 50,
  },
  arrow: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  result: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  infoText: {
    color: "#888",
    fontSize: 14,
  },
  selectorContainer: {
    flex: 1,
  },
  selectorButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  selectorText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 14,
    color: "#2c6bed",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 20,
    color: "#666",
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
});
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  FlatList,
  useColorScheme,
  StyleSheet,
  ScrollView
} from "react-native";
import { useTheme } from '../constants/context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter} from 'expo-router';

export default function CurrencyExchange() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

   const router=useRouter();
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = [
    { label: "USD - US Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "GBP - British Pound", value: "GBP" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "INR - Indian Rupee", value: "INR" },
    { label: "PKR - Pakistani Rupee", value: "PKR" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "CNY - Chinese Yuan", value: "CNY" },
    { label: "BRL - Brazilian Real", value: "BRL" },
    { label: "TRY - Turkish Lira", value: "TRY" },
    { label: "QAR - Qatari Riyal", value: "QAR" },
  ];

  const currencySymbol = (code) => {
    const symbols = {
      USD: "$", EUR: "€", GBP: "£", JPY: "¥", INR: "₹", PKR: "₨",
      CAD: "C$", AUD: "A$", CNY: "¥", BRL: "R$", TRY: "₺", QAR: "ر.ق",
    };
    return symbols[code] || code;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      convertCurrency();
    }, 500);

    return () => clearTimeout(timer);
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      if (!amount) return setResult(null);
      Alert.alert("Invalid input", "Please enter a valid number");
      return;
    }

    setLoading(true);
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates?.[toCurrency]) {
          const rate = data.rates[toCurrency];
          setResult((parseFloat(amount) * rate).toFixed(2));
        } else {
          Alert.alert("Error", "Could not fetch exchange rate");
        }
      })
      .catch(() => Alert.alert("Error", "Something went wrong"))
      .finally(() => setLoading(false));
  };

  const renderModal = (visible, setVisible, selected, setSelected) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          { backgroundColor: isDark ? '#1E1E1E' : 'white'}
        ]}>
          <Text style={[
            styles.modalTitle,
            { color: isDark ? '#FFFFFF' : 'black' }
          ]}>
            Select Currency
          </Text>
  
           <ScrollView style={styles.modalScroll}>
                              {currencies.map((currency) =>  {
    const isSelected = selected === currency.value;
    return (
                               <TouchableOpacity
                               key={currency.value}
                                 style={[
                                   styles.currencyOption,
                                   {
                                    borderBottomColor: isDark ? '#333333' : '#EEE',
                                    backgroundColor: isSelected
                                    ? (isDark ? '#333333' : '#F2F2F2') // highlighted background
                                    : 'transparent',
                                   }
                                 ]}
                                 onPress={() => setSelected(currency.value)}
                               >
                                 <Text style={[
                                   styles.currencyOptionText,
                                   { color: isDark ? '#FFFFFF' : 'black', }
                                 ]}>
                                   {currencySymbol(currency.value)} {currency.label}
                                 </Text>
                               </TouchableOpacity>
                              );
                            })}
                            </ScrollView>
  
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.cancelModalButton,
                { backgroundColor: isDark ? '#333333' : '#F2F2F2' }
              ]}
              onPress={() => setVisible(false)}
            >
              <Text style={[
                styles.cancelButtonText,
                { color: isDark ? '#fff' : '#000' }
              ]}>
                Cancel
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.confirmModalButton
              ]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FAFAFA' }]}>
      
      <View style={{
    ...styles.header,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: isDark ? '#444444' : 'lightgrey',
  }}
>
  {/* Back Button */}
  <TouchableOpacity
    onPress={() => router.back()}
    style={{ padding: 8 }}>
    <Ionicons name="arrow-back" size={28} color={isDark ? '#fff' : '#000'} />
  </TouchableOpacity>

  {/* Title */}
  <Text
    style={{
      ...styles.headerTitle,
      flex: 1,
      textAlign: 'center',
      color: isDark ? '#FFFFFF' : '#333',
    }}
  >
    Currency Converter
  </Text>
</View>
<TextInput
       style={{...styles.input,
            color: isDark ? 'white' : 'black',
          }}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />
      <View style={styles.row}>
        <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: isDark ? '#333333' : '#EEE'
            ,borderColor: isDark ? '#555555' : 'grey'}]}
            onPress={() => setShowFromModal(true)}>
        <Text style={[styles.symbolText, {color: isDark ? '#FFFFFF' : 'black'}]}>
            {currencySymbol(fromCurrency)} {fromCurrency}
           </Text>
        </TouchableOpacity>

        <Text style={[styles.arrow, { color: isDark ? "#fff" : "#000" }]}>→</Text>

        <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: isDark ? '#333333' : '#EEE'
            ,borderColor: isDark ? '#555555' : 'grey'}]} 
            onPress={() => setShowToModal(true)}>
       <Text style={[styles.symbolText, {color: isDark ? '#FFFFFF' : 'black'}]}>
            {currencySymbol(toCurrency)} {toCurrency}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2c6bed" style={{ marginTop: 20 }} />
      ) : (
        result && (
          <Text style={[styles.result, { color: isDark ? "#fff" : "#000" }]}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </Text>
        )
      )}

      <Text style={[styles.infoText, { color: isDark ? "#888" : "#888" }]}>
        Using free open exchange rates API
      </Text>

      {renderModal(showFromModal, setShowFromModal, fromCurrency, setFromCurrency)}
      {renderModal(showToModal, setShowToModal, toCurrency, setToCurrency)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 8,
    borderColor: 'grey',
    width: '80%',
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "80%",
    
    justifyContent: "center",
  },
  arrow: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  result: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  infoText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 40,
  },
  dropdownButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
   
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '600',
  },
 /*  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "flex-end",
  },
  modalContent: {
    maxHeight: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  }, 
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },*/
  
  cancelButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 300,
  },
  currencyOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  selectedCurrency: {},
  currencyOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelModalButton: {},
  confirmModalButton: {
    backgroundColor: '#FF6B6B',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
