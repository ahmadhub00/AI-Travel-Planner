import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,KeyboardAvoidingView,Platform,Modal,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExpenseTracker() {
  const [budget, setBudget] = useState('');
  const [expenseInput, setExpenseInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [budgetCurrency, setBudgetCurrency] = useState('USD');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Load saved data when component mounts
  useEffect(() => {
    loadSavedData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveData();
  }, [expenses, budget, budgetCurrency]);

  const loadSavedData = async () => {
    try {
      const savedBudget = await AsyncStorage.getItem('budget');
      const savedExpenses = await AsyncStorage.getItem('expenses');
      const savedCurrency = await AsyncStorage.getItem('currency');

      if (savedBudget) setBudget(savedBudget);
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
      if (savedCurrency) setBudgetCurrency(savedCurrency);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('budget', budget);
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      await AsyncStorage.setItem('currency', budgetCurrency);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddExpense = () => {
    const amount = parseFloat(expenseInput.trim());
    if (!isNaN(amount)) {
      setExpenses([
        ...expenses,
        { category: categoryInput.trim() || 'Other', amount: amount, date: new Date().toISOString() },
      ]);
      setExpenseInput('');
      setCategoryInput('');
    }
  };

  const resetAll = async () => {
    try {
      await AsyncStorage.removeItem('budget');
      await AsyncStorage.removeItem('expenses');
      await AsyncStorage.removeItem('currency');
      
      setBudget('');
      setExpenses([]);
      setBudgetCurrency('USD');
      setCategoryInput('');
      setExpenseInput('');
      setShowResetModal(false);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const currencySymbol = (code) => {
    switch (code) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'PKR': return '₨';
      case 'JPY': return '¥';
      case 'GBP': return '£';
      case 'CAD': return 'C$';
      case 'AUD': return 'A$';
      case 'INR': return '₹';
      case 'CNY': return '¥';
      default: return '';
    }
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate available budget
  const availableBudget = parseFloat(budget) - totalExpenses;

  const currencies = [
    { label: 'US Dollar (USD)', value: 'USD' },
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'British Pound (GBP)', value: 'GBP' },
    { label: 'Japanese Yen (JPY)', value: 'JPY' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD' },
    { label: 'Australian Dollar (AUD)', value: 'AUD' },
    { label: 'Pakistan Rupee (PKR)', value: 'PKR' },
    { label: 'Indian Rupee (INR)', value: 'INR' },
    { label: 'Chinese Yuan (CNY)', value: 'CNY' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header with Reset Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Tracker</Text>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setShowResetModal(true)}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Total Budget */}
      <Text style={styles.sectionTitle}>Total Budget</Text>
      <View style={styles.budgetRow}>
        <TouchableOpacity 
          style={styles.symbolBox}
          onPress={() => setShowCurrencyModal(true)}
        >
          <Text style={styles.symbolText}>{currencySymbol(budgetCurrency)}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Set your budget"
          placeholderTextColor="grey"
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />
        {budget !== '' && (
          <View style={styles.availableBudgetContainer}>
            <Text style={styles.availableBudgetLabel}>Available:</Text>
            <Text style={[
              styles.availableBudgetValue,
              availableBudget < 0 ? styles.negativeAmount : styles.positiveAmount
            ]}>
              {currencySymbol(budgetCurrency)}{isNaN(availableBudget) ? '0' : availableBudget.toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      {/* Expenses */}
      <Text style={styles.sectionTitle}>Expenses</Text>
      <ScrollView style={styles.expenseBox}>
        {expenses.length === 0 ? (
          <Text style={styles.noExpensesText}>No expenses yet</Text>
        ) : (
          expenses.map((expense, index) => (
            <View key={index} style={styles.expenseItem}>
              <Text style={styles.expenseText}>{expense.category}</Text>
              <Text style={styles.expenseText}>
                {currencySymbol(budgetCurrency)}{expense.amount}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Expense */}
      <Text style={styles.sectionTitle}>Add Expense</Text>
      <View style={styles.expenseInputContainer}>
      <View style={styles.amountInputRow}>
        <TextInput
          style={styles.categoryInput}
          placeholder="Category"
          placeholderTextColor="grey"
          value={categoryInput}
          onChangeText={setCategoryInput}
        />
          <TextInput
            style={styles.amountInput}
            placeholder="Amount"
            placeholderTextColor="grey"
            keyboardType="numeric"
            value={expenseInput}
            onChangeText={setExpenseInput}
          />
          
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
      </View>

      {/* Currency Modal */}
      <Modal
        visible={showCurrencyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Budget Currency</Text>
            <ScrollView style={styles.modalScroll}>
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.value}
                  style={[
                    styles.currencyOption,
                    budgetCurrency === currency.value && styles.selectedCurrency
                  ]}
                  onPress={() => {
                    setBudgetCurrency(currency.value);
                    setShowCurrencyModal(false);
                  }}
                >
                  <Text style={styles.currencyOptionText}>
                    {currencySymbol(currency.value)} {currency.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowCurrencyModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        visible={showResetModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowResetModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Expense Tracker</Text>
            <Text style={styles.modalText}>
              Are you sure you want to reset all data? This will delete your budget, all expenses, and settings.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setShowResetModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmModalButton]}
                onPress={resetAll}
              >
                <Text style={styles.confirmButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  /* For each section */
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 8,
    marginTop: 16,
    color: 'black',
  },

  /* Header with Reset Button */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 8,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
  },


/* Add Expense */
  expenseInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  categoryInput: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  amountInput: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  amountInputRow: {
    flexDirection: 'column',
    width: '80%',
    gap: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 50
  },
  buttonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
  },

  /* Total Budget */
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  symbolBox: {
    backgroundColor: '#EEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  availableBudgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: 'grey',
  },
  availableBudgetLabel: {
    fontSize: 14,
    marginRight: 4,
    color: 'black',
  },
  availableBudgetValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: '#2E7D32',
  },
  negativeAmount: {
    color: '#D32F2F',
  },
  

/* Expenses */
  expenseBox: {
    maxHeight: 180,
    marginBottom: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  noExpensesText: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
    fontStyle: 'italic',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  expenseText: {
    fontSize: 16,
    color: 'black',
  },
 
  /* Reset Confirmation Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
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
    color: 'black',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  modalScroll: {
    maxHeight: 300,
  },


  
  currencyOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  selectedCurrency: {
    backgroundColor: '#F2F2F2',
  },
  currencyOptionText: {
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'outfit-medium',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelModalButton: {
    backgroundColor: '#F2F2F2',
  },
  confirmModalButton: {
    backgroundColor: '#FF6B6B',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
 
  
});