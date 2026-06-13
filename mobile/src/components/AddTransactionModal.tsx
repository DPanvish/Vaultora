import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { X } from 'lucide-react-native';
import { useAddTransaction, useAccounts } from '../hooks/useFinance';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export default function AddTransactionModal({ visible, onClose }: Props) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
    const [selectedAccount, setSelectedAccount] = useState('');

    const {data: accounts = []} = useAccounts();
    const {mutate: addTransaction, isPending} = useAddTransaction();

    const handleSubmit = () => {
        if (!amount || !category || !selectedAccount) {
            alert('Please fill out all fields');
        return;
        }

        addTransaction({
            amount: Number(amount),
            category,
            type,
            account: selectedAccount, 
            description: 'Logged via Vaultora Mobile',
            date: new Date().toISOString()
        }, {
            onSuccess: () => {
                setAmount('');
                setCategory('');
                onClose();
            }
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                    <Text style={styles.title}>New Transaction</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <X size={20} color="#888" />
                    </TouchableOpacity>
                </View>

                {/* Type Toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity 
                        style={[styles.toggleBtn, type === 'EXPENSE' && styles.activeExpense]}
                        onPress={() => setType('EXPENSE')}
                    >
                        <Text style={[styles.toggleText, type === 'EXPENSE' && styles.activeText]}>Expense</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.toggleBtn, type === 'INCOME' && styles.activeIncome]}
                        onPress={() => setType('INCOME')}
                    >
                        <Text style={[styles.toggleText, type === 'INCOME' && styles.activeText]}>Income</Text>
                    </TouchableOpacity>
                </View>

                {/* Amount Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Amount (₹)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        placeholderTextColor="#555"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>

                {/* Category Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Food, Rent, Salary"
                        placeholderTextColor="#555"
                        value={category}
                        onChangeText={setCategory}
                    />
                </View>

                {/* Wallet Selector (Horizontal Pills) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Wallet / Account</Text>
                    <View style={styles.pillContainer}>
                        {accounts.map((acc: any) => (
                            <TouchableOpacity
                                key={acc._id}
                                style={[styles.pill, selectedAccount === acc._id && styles.activePill]}
                                onPress={() => setSelectedAccount(acc._id)}
                            >
                                <Text style={[styles.pillText, selectedAccount === acc._id && styles.activePillText]}>
                                    {acc.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity 
                    style={styles.submitBtn} 
                    onPress={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitBtnText}>Confirm Transaction</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#0A0A0A',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        borderTopWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
    },
    closeBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#121212',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeExpense: { backgroundColor: '#FB7185' },
    activeIncome: { backgroundColor: '#34D399' },
    toggleText: {
        color: '#888',
        fontWeight: '600',
        fontSize: 14,
    },
    activeText: { color: '#000' },
    inputGroup: { marginBottom: 20 },
    label: {
        color: '#888',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#121212',
        color: '#FFF',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    pill: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#121212',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    activePill: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#8B5CF6',
    },
    pillText: { color: '#888', fontSize: 14, fontWeight: '500' },
    activePillText: { color: '#A78BFA' },
    submitBtn: {
        backgroundColor: '#8B5CF6',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    submitBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    }
});