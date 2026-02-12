import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {/* LOGO */}
        <Image
          source={require("./assets/image.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>A.P. Moller – Maersk</Text>
        <Text style={styles.subtitle}>Global logistics and shipping</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>support@maersk.com</Text>
        <Text style={styles.text}>+45 70 63 63 63</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Address</Text>
        <Text style={styles.text}>Esplanaden 50</Text>
        <Text style={styles.text}>1263 København K</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 20,
    elevation: 6,
  },
  logo: {
    width: "100%",
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#e6e6e6",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#777",
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
