import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Wallet, ArrowRight } from 'lucide-react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
        alignItems: 'center',
        justifyContent: 'center',
    },
    glow: {
        position: 'absolute',
        width: 300,
        height: 300,
        backgroundColor: '#8B5CF6',
        opacity: 0.15,
        borderRadius: 150,
        top: '20%',
    },
    content: {
        alignItems: 'center',
        zIndex: 10,
    },
    iconContainer: {
        padding: 20,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderRadius: 30,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(139, 92, 246, 0.2)',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: '700',
        letterSpacing: -1,
        marginBottom: 8,
    },
    subtitle: {
        color: '#888888',
        fontSize: 16,
        letterSpacing: 0.5,
        marginBottom: 48,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        gap: 8,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

const index = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.glow}/>
            
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Wallet stroke="#8B5CF6" strokeWidth={1.5} size={48} />
                </View>

                <Text style={styles.title}>Vaultora</Text>
                <Text style={styles.subtitle}>Independent Living Ledger</Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => console.log("Init Auth Flow")}
                >
                    <Text style={styles.buttonText}>Connect Wallet</Text>
                    <ArrowRight stroke="#FFF" size={18} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default index