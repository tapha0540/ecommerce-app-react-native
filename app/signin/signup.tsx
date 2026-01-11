import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Bienvenue Remplit les champs pour creer votre compte.
      </Text>

      <View style={styles.form}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prenom"
          label="Prenom"
          style={styles.textInputs}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nom"
          style={styles.textInputs}
        />
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          style={styles.textInputs}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="confirmer votre mot de passe"
          style={styles.textInputs}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
  },
  form: {},
  textInputs: {
    height: 10,
    width: 50,
  },
});

export default SignUp;
