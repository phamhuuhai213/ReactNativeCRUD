import { addDoc, collection } from "firebase/firestore";
import { Alert, Button, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function HomeScreen() {
  const testFirebase = async () => {
    try {
      // Thử thêm một document vào collection tên là "test_haidylan"
      const docRef = await addDoc(collection(db, "test_haidylan"), {
        message: "Chào Firebase, tui là Hải nè!",
        time: new Date().toISOString(),
      });
      Alert.alert("Ngon lành!", "Đã ghi dữ liệu với ID: " + docRef.id);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      Alert.alert("Lỗi rồi!", e.message);
      console.error("Lỗi chi tiết: ", e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Bấm để kiểm tra Firebase" onPress={testFirebase} />
    </View>
  );
}
