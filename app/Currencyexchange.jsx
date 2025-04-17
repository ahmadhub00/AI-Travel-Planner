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
  const [currencies, setCurrencies] = useState(["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "RUB"]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
             label={currency}
              value={currency}
              key={`from-${currency}`}
               color="grey" 
                style={{color: 'grey'}} />
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
            label={currency}
            value={currency}
             key={`to-${currency}`}
              color="grey"/>
          ))}
        </Picker>
      </View>

      <Button 
        title="Convert Currency" 
        onPress={convertCurrency} 
      />

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

