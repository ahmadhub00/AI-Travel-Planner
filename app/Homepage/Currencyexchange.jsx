import React, { useState, useEffect } from "react";
import {View,Text,TextInput,ActivityIndicator,Alert,TouchableOpacity,Modal,
       FlatList,useColorScheme,StyleSheet,ScrollView} from "react-native";
import { useTheme } from '../../constants/context/ThemeContext';
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
