import { useAuth, useUser } from "@clerk/clerk-expo"
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
    const {signOut} = useAuth();
    const {user} = useUser();

    const handleSignOut = async() => {
        await signOut();
        router.replace("/")
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.name}>{user?.firstName || 'Vaultora User'}</Text>
                </View>

                <TouchableOpacity onPress={handleSignOut} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.placeholderText}>Your mobile ledger feed will appear here.</Text>
            </View>
        </SafeAreaView>
    )
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
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
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderRadius: 8,
  },
  logoutText: {
    color: '#F43F5E',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 14,
  }
});

export default Dashboard;