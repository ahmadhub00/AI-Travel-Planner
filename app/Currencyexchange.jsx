/* import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Currencyexchange() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all available currencies
  useEffect(() => {
    fetch("https://api.exchangerate.host/symbols")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data.symbols));
      })
      .catch((err) => console.log(err));
  }, []);

  const convertCurrency = () => {
    if (!amount || isNaN(amount)) return;
    setLoading(true);
    fetch(
      `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.result.toFixed(2));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Exchanger</Text>

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
        >
          {currencies.map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
        </Picker>

        <Text style={styles.arrow}>→</Text>

        <Picker
          selectedValue={toCurrency}
          onValueChange={(itemValue) => setToCurrency(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
        </Picker>
      </View>

      <Button title="Convert" onPress={convertCurrency} />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        result && (
          <Text style={styles.result}>
            {amount} {fromCurrency} = {result} {toCurrency}
          </Text>
        )
      )}
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
});
 */
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
      <Text style={styles.header}>Currency Exchanger</Text>

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

