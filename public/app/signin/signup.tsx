import { SignUpData } from "@/components/interfaces/api/requestResponses";
import Theme from "@/components/interfaces/themes";
import ThemeActivityIndicator from "@/components/ui/activity_indicator_container";
import { BoldText, ThemedText } from "@/components/ui/text";
import { COUNTRY_CODES } from "@/constants/contry_calling_codes";
import { useTheme } from "@/hooks/useColorsheme";
import signUp from "@/services/auth/signup";
import validateSignupData from "@/services/validation/auth/signup_data_validation";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Vibration, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { OutlineThemeButton } from "../../components/ui/buttons";

const SignUpScreen = () => {
  const theme = useTheme()!.theme;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCallingCode, setCountryCallingCode] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("");

      const signUpData: SignUpData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.replaceAll(" ", ""),
        phone: `${countryCallingCode}${phone.replaceAll(" ", "")}`,
        password,
      };
      const error = validateSignupData({
        ...signUpData,
        confirmPassword,
      });
      if (!countryCallingCode) {
        setMessage("l'indicatif du pays est obligatoire.");
        setSuccess(false);
        return;
      }
      if (error) {
        setMessage(error);
        setSuccess(false);
        return;
      }
      signUp(signUpData).then((response) => {
        setLoading(false);
        setMessage(response.message);
        setSuccess(response.success);
        if (response.success) {
          setTimeout(() => router.push("/signin/login"), 3500);
        }
      });

      setTimeout(() => {
        setMessage("");
      }, 3500);
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
        <ThemeActivityIndicator
          loading={loading}
          text="Création de compte..."
          size="large"
          theme={theme}
        />
        <ThemedText
          style={[styles.heading, { color: theme.textColor }]}
          content="Bienvenue Remplit tous les champs pour créer votre compte."
          theme={theme}
        />
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
            maxLength={50}
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
            maxLength={50}
          />
          <View style={[styles.textInputs, styles.telInputContainer]}>
            <DropdownComponent
              countryCallingCode={countryCallingCode}
              setCountryCallingCode={setCountryCallingCode}
              theme={theme}
            />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="7X XXX XX XX"
              style={styles.phone}
              mode="outlined"
              textColor={theme.textColor}
              outlineColor={theme.secondaryColor}
              activeOutlineColor={theme.primaryColor}
              keyboardType="number-pad"
              maxLength={50}
            />
          </View>
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
          <BoldText
            style={[
              styles.message,
              { color: success ? theme.successColor : theme.errorColor },
            ]}
            content={message}
            theme={theme}
          />
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

const DropdownComponent = ({
  countryCallingCode,
  setCountryCallingCode,
  theme,
}: {
  countryCallingCode: string;
  setCountryCallingCode: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
}) => {
  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={[styles.item, { backgroundColor: theme.backgroundColor }]}>
        <BoldText
          style={[styles.textItem, { color: theme.textColor }]}
          content={item.label}
          theme={theme}
        />
        {item.value === countryCallingCode && (
          <AntDesign
            style={styles.icon}
            color={theme.primaryColor}
            name="safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={[styles.dropdown, { backgroundColor: theme.backgroundColor }]}
      placeholderStyle={[styles.placeholderStyle, { color: "grey" }]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        { color: theme.primaryColor },
      ]}
      inputSearchStyle={[
        styles.inputSearchStyle,
        { backgroundColor: theme.backgroundColor },
      ]}
      data={COUNTRY_CODES}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Selectionner"
      searchPlaceholder="Rechercher..."
      value={countryCallingCode}
      onChange={(item) => {
        setCountryCallingCode(item.value);
        Vibration.vibrate(125);
      }}
      renderItem={renderItem}
      containerStyle={{ backgroundColor: theme.backgroundColor }}
      renderRightIcon={() =>
        countryCallingCode ? (
          <AntDesign
            style={styles.icon}
            color={theme.primaryColor}
            name="safety"
            size={20}
          />
        ) : null
      }
    />
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

  telInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  prefix: {
    width: "25%",
    textAlign: "center",
    fontSize: 16,
    marginRight: "5%",
  },
  phone: {
    width: "55%",
    backgroundColor: "transparent",
  },
  dropdown: {
    width: "40%",
    marginRight: "5%",
    alignSelf: "center",
    height: 50,
    borderRadius: 5,
    shadowColor: "#633c3c",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 1,
    borderColor: "grey",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontSize: 16,
  },
});

export default SignUpScreen;
