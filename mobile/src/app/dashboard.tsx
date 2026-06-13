import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { ArrowDownLeft, ArrowUpRight, Plus } from 'lucide-react-native';
import { useTransactions, useAccounts } from '../hooks/useFinance';
import AddTransactionModal from '../components/AddTransactionModal';


const Dashboard = () => {
    const { signOut } = useAuth();
    const { user } = useUser();
    const { data: transactions = [], isLoading: txLoading } = useTransactions();
    const { data: accounts = [], isLoading: accLoading } = useAccounts();
    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleSignOut = async() => {
        await signOut();
        router.replace("/")
    };

    const totalBalance = accounts.reduce((sum: number, acc: any) => sum + acc.currentBalance, 0);

    const renderTransaction = ({ item }: { item: any }) => {
        const isIncome = item.type === 'INCOME';
        
        return (
            <View style={styles.txCard}>
                <View style={styles.txLeft}>
                    <View style={[styles.iconBox, isIncome ? styles.iconIncome : styles.iconExpense]}>
                        {isIncome ? (
                        <ArrowDownLeft size={20} color="#34D399" /> 
                        ) : (
                        <ArrowUpRight size={20} color="#FB7185" />
                        )}
                    </View>
                    <View>
                        <Text style={styles.txCategory}>{item.category}</Text>
                        <Text style={styles.txDate}>
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Text>
                    </View>
                </View>
                    
                <View style={styles.txRight}>
                    <Text style={[styles.txAmount, isIncome ? styles.textIncome : styles.textExpense]}>
                        {isIncome ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                    </Text>
                    <Text style={styles.txAccount} numberOfLines={1}>
                        {item.account?.name || 'Wallet'}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.name}>{user?.firstName || 'User'}</Text>
                </View>
                <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
                <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            {/* Balance Card */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Total Liquidity</Text>
                {accLoading ? (
                    <ActivityIndicator color="#8B5CF6" style={{ marginTop: 10, alignSelf: 'flex-start' }} />
                ) : (
                    <Text style={styles.balanceAmount}>₹{totalBalance.toLocaleString('en-IN')}</Text>
                )}
            </View>

            {/* Transactions List */}
            <View style={styles.feedContainer}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                
                {txLoading ? (
                    <ActivityIndicator color="#8B5CF6" style={{ marginTop: 40 }} />
                ) : transactions.length === 0 ? (
                    <Text style={styles.emptyText}>No transactions found.</Text>
                ) : (
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item._id}
                        renderItem={renderTransaction}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </View>

            {/* The Glowing FAB */}
            <TouchableOpacity 
                style={styles.fab} 
                activeOpacity={0.8}
                onPress={() => setIsModalVisible(true)}
            >
                <Plus size={24} color="#FFF" />
            </TouchableOpacity>

            {/* The Modal */}
            <AddTransactionModal 
                visible={isModalVisible} 
                onClose={() => setIsModalVisible(false)} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
    },
    greeting: {
        color: '#888',
        fontSize: 14,
    },
    name: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '700',
        marginTop: 2,
    },
    logoutBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    logoutText: {
        color: '#AAA',
        fontSize: 12,
        fontWeight: '600',
    },
    balanceContainer: {
        marginHorizontal: 24,
        marginTop: 10,
        marginBottom: 30,
        padding: 24,
        backgroundColor: '#120B29', 
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.3)',
    },
    balanceLabel: {
        color: '#A78BFA',
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    balanceAmount: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '800',
        marginTop: 8,
        letterSpacing: -1,
    },
    feedContainer: {
        flex: 1,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    emptyText: {
        color: '#555',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 40,
    },
    txCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0A0A0A',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    txLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconIncome: {
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
    },
    iconExpense: {
        backgroundColor: 'rgba(251, 113, 133, 0.1)',
    },
    txCategory: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    txDate: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
    },
    txRight: {
        alignItems: 'flex-end',
    },
    txAmount: {
        fontSize: 16,
        fontWeight: '700',
    },
    textIncome: {
        color: '#34D399',
    },
    textExpense: {
        color: '#FFF',
    },
    txAccount: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
        maxWidth: 100,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#8B5CF6',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
    }
});

export default Dashboard;