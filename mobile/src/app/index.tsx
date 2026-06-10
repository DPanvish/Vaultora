import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Wallet } from 'lucide-react-native';
import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';


WebBrowser.maybeCompleteAuthSession();

const Home = () => {
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
    const [isLoading, setIsLoading] = React.useState(false);

    const handleGoogleSignIn = async () => {
        try{
            setIsLoading(true);
            
            const redirectUrl = Linking.createURL('/dashboard', { scheme: 'vaultora' });

            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl,
            });

            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
                router.replace('/dashboard'); 
            }
        }catch(err){
            console.error('OAuth error', err);
        }finally{
            setIsLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.glow} />

        <View style={styles.content}>
            <View style={styles.iconContainer}>
                <Wallet stroke="#8B5CF6" strokeWidth={1.5} size={48} />
            </View>

            <Text style={styles.title}>Vaultora</Text>
            <Text style={styles.subtitle}>Independent Ledger</Text>

            <TouchableOpacity 
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleGoogleSignIn}
                disabled={isLoading}
            >
            {isLoading ? (
                <ActivityIndicator color="#FFF" />
            ) : (
                <>
                    <View style={styles.googleIconPlaceholder}>
                        <Text style={styles.googleText}>G</Text>
                    </View>
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </>
            )}
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

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
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 16,
        gap: 12,
    },
    googleIconPlaceholder: {
        backgroundColor: '#FFF',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 14,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default Home;