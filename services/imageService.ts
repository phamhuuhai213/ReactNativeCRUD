import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const pickImageFromLibrary = async (): Promise<string | null> => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.3,
    base64: true,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const asset = result.assets[0];
    return asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri;
  }
  
  return null;
};

export const fetchProductImage = async (docId: string): Promise<string> => {
  const snap = await getDoc(doc(db, 'products', docId));
  if (snap.exists()) {
    return snap.data().hinhanh || '';
  }
  return '';
};
