import { useTheme } from "@/hooks/useColorsheme";
import signUp from "@/utils/auth/signup";
import validateSignupData from "@/utils/validation/signup_data_validation";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { OutlineThemeButton } from "../../components/ui/buttons";

const SignUpScreen = () => {
  const theme = useTheme()!.theme;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      setFirstName(firstName.trim());
      setLastName(lastName.trim());
      setEmail(email.trim());
      setPassword(password.trim());
      setConfirmPassword(confirmPassword.trim());
      setMessage("");
      const error = validateSignupData({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      if (error) {
        setMessage(error);
        setSuccess(false);
        return;
      }
      signUp(firstName, lastName, email, password).then((response) => {
        setLoading(false);
        setMessage(response.message);
        setSuccess(response.success);
      });

      setTimeout(() => {
        setMessage("");
        if (success) router.push("/(tabs)");
      }, 2500);
    }, 2000);
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {loading && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color={theme.primaryColor} />
            <Text style={{ color: theme.primaryColor }}>
              Création de compte...
            </Text>
          </View>
        )}
        <Text style={[styles.heading, { color: theme.textColor }]}>
          Bienvenue Remplit tous les champs pour créer votre compte.
        </Text>
        <View style={styles.form}>
          <TextInput
            label="Prenom"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Entrez votre Prenom ici"
            style={styles.textInputs}
            mode="outlined"
            textColor={theme.textColor}
            outlineColor={theme.secondaryColor}
            activeOutlineColor={theme.primaryColor}
            keyboardType="default"
            maxLength={35}
          />
          <TextInput
            label="Nom"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Entrez votre nom ici"
            style={styles.textInputs}
            mode="outlined"
            textColor={theme.textColor}
            outlineColor={theme.secondaryColor}
            activeOutlineColor={theme.primaryColor}
            keyboardType="default"
            maxLength={35}
          />
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
            maxLength={60}
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
          <TextInput
            label="Confirmer mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
        <OutlineThemeButton text="S'inscrire" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  heading: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  form: {
    flexDirection: "column",
    rowGap: 15,
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

export default SignUpScreen;
