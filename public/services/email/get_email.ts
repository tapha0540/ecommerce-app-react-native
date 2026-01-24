import AsyncStorage from "@react-native-async-storage/async-storage"

const getSavedEmail = async () => {
    return await AsyncStorage.getItem('email');
}

export default getSavedEmail;