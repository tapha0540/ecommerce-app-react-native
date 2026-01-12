import { ActivityIndicator, Text, TextInput } from "react-native-paper";

import { useTheme } from "@/hooks/useColorsheme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { LoginData } from "@/components/interfaces/requestResponses";
import logIn from "@/services/auth/login";
import validateLogInData from "@/services/validation/login_data_validation";
import { SafeAreaView } from "react-native-safe-area-context";
import { OutlineThemeButton } from "../../components/ui/buttons";

const LoginScreen = () => {
  const theme = useTheme()!.theme;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("");
      const loginData: LoginData = {
        email: email.replaceAll(" ", ""),
        password: password,
      };
      const error = validateLogInData(loginData);
      if (error) {
        setMessage(error);
        setSuccess(false);
        return;
      }
      logIn(loginData).then((response) => {
        setLoading(false);
        setMessage(response.message);
        setSuccess(response.success);
      });

      setTimeout(() => {
        setMessage("");
        if (success) router.push("/(tabs)");
      }, 4000);
    }, 2000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {loading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={theme.primaryColor} />
            <Text style={{ color: theme.primaryColor }}>
              Création de compte...
            </Text>
          </View>
        )}
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Bienvenue de nouveau !
        </Text>
        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Ex: example@example.com"
            style={styles.textInputs}
            mode="outlined"
            textColor={theme.textColor}
            outlineColor={theme.secondaryColor}
            activeOutlineColor={theme.primaryColor}
            keyboardType="email-address"
            maxLength={100}
          />
          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            placeholder="Ex: XXXX"
            style={styles.textInputs}
            mode="outlined"
            textColor={theme.textColor}
            outlineColor={theme.secondaryColor}
            activeOutlineColor={theme.primaryColor}
            keyboardType="visible-password"
            maxLength={256}
          />
        </View>
        {message && (
          <Text
            style={[
              styles.message,
              { color: success ? theme.successColor : theme.errorColor },
            ]}
          >
            {message}
          </Text>
        )}
        <OutlineThemeButton
          text="S'inscrire"
          onPress={handleSubmit}
          theme={theme}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 40,
  },

  heading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  form: {
    flexDirection: "column",
    rowGap: 20,
    marginTop: 15,
  },
  textInputs: {
    height: 50,
    width: 300,
    maxWidth: "90%",
    backgroundColor: "transparent",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 15,
  },
  activityIndicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    rowGap: 10,
  },
});

export default LoginScreen;
