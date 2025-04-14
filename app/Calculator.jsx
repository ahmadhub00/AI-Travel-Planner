import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,KeyboardAvoidingView,Platform,Modal,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../constants/context/ThemeContext'

export default function ExpenseTracker() {
      const { theme } = useTheme();
      const isDark = theme === 'dark';
  
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
    backgroundColor: isDark ? '#121212' : '#FAFAFA',
  },
  /* For each section */
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    marginBottom: 8,
    marginTop: 16,
    color: isDark ? '#FFFFFF' : 'black',
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
    borderBottomColor: isDark ? '#444444' : 'lightgrey',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDark ? '#FFFFFF' : '#333',
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
    borderColor: isDark ? '#555555' : 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: isDark ? '#2A2A2A' : '#FFF',
    color: isDark ? '#FFFFFF' : 'black',
  },
  amountInput: {
    borderColor: isDark ? '#555555' : 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: isDark ? '#2A2A2A' : '#FFF',
    color: isDark ? '#FFFFFF' : 'black',
  },
  amountInputRow: {
    flexDirection: 'column',
    width: '80%',
    gap: 10,
  },
  button: {
    backgroundColor: isDark ? '#444444' : 'black',
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
    backgroundColor: isDark ? '#333333' : '#EEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isDark ? '#555555' : 'grey',
  },
  symbolText: {
    fontSize: 18,
    fontWeight: '600',
    color: isDark ? '#FFFFFF' : 'black',
  },
  input: {
    flex: 1,
    borderColor: isDark ? '#555555' : 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: isDark ? '#2A2A2A' : '#FFF',
    color: isDark ? '#FFFFFF' : 'black',
  },
  availableBudgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: isDark ? '#333333' : '#EEE',
    borderWidth: 1,
    borderColor: isDark ? '#555555' : 'grey',
  },
  availableBudgetLabel: {
    fontSize: 14,
    marginRight: 4,
    color: isDark ? '#FFFFFF' : 'black',
  },
  availableBudgetValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: isDark ? '#81C784' : '#2E7D32', // Lighter green in dark mode
  },
  negativeAmount: {
    color: isDark ? '#EF5350' : '#D32F2F', // Lighter red in dark mode
  },

  /* Expenses */
  expenseBox: {
    maxHeight: 180,
    marginBottom: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: isDark ? '#444444' : 'lightgrey',
    borderRadius: 8,
    backgroundColor: isDark ? '#2A2A2A' : '#FFF',
  },
  noExpensesText: {
    textAlign: 'center',
    padding: 20,
    color: isDark ? '#777777' : '#999',
    fontStyle: 'italic',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: isDark ? '#444444' : '#DDD',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  expenseText: {
    fontSize: 16,
    color: isDark ? '#FFFFFF' : 'black',
  },

  /* Reset Confirmation Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: isDark ? '#1E1E1E' : 'white',
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
    color: isDark ? '#FFFFFF' : 'black',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: isDark ? '#BBBBBB' : '#555',
  },
  modalScroll: {
    maxHeight: 300,
  },

  currencyOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? '#333333' : '#EEE',
  },
  selectedCurrency: {
    backgroundColor: isDark ? '#333333' : '#F2F2F2',
  },
  currencyOptionText: {
    fontSize: 16,
    color: isDark ? '#FFFFFF' : 'black',
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: isDark ? '#333333' : '#F2F2F2',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: isDark ? '#FFFFFF' : 'black',
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
    backgroundColor: isDark ? '#333333' : '#F2F2F2',
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