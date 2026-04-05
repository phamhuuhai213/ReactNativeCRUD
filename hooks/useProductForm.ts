import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addProduct, updateProduct } from '../services/productService';
import { fetchProductImage, pickImageFromLibrary } from '../services/imageService';
import { scanProductImage } from '../services/aiService';
import { Alert } from 'react-native';

export const useProductForm = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const isEditing = !!params._docId;

  const [form, setForm] = useState({
    idsanpham: (params.idsanpham as string) || '',
    tensp: (params.tensp as string) || '',
    loaisp: (params.loaisp as string) || '',
    gia: (params.gia as string) || '',
    hinhanh: '',
  });
  const [loading, setLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  // Load hinhanh from Firestore when editing (avoid passing base64 via params)
  useEffect(() => {
    if (params._docId) {
      fetchProductImage(params._docId as string).then((url) => {
        if (url) setForm((prev) => ({ ...prev, hinhanh: url }));
      });
    }
  }, [params._docId]);

  const pickImage = async () => {
    setLoading(true);
    const imageUri = await pickImageFromLibrary();
    setLoading(false);

    if (imageUri) {
      setForm((prev) => ({ ...prev, hinhanh: imageUri }));
      
      // Tự động chạy quét AI sau khi chọn ảnh
      setIsScanning(true);
      const aiResult = await scanProductImage(imageUri);
      setIsScanning(false);
      
      if (aiResult) {
        setForm((prev) => ({
          ...prev,
          idsanpham: aiResult.idsanpham || prev.idsanpham,
          tensp: aiResult.tensp || prev.tensp,
          loaisp: aiResult.loaisp || prev.loaisp,
          gia: aiResult.gia || prev.gia,
        }));
      } else {
        Alert.alert("Lỗi AI", "Không thể tự động điền thông tin. Vui lòng kiểm tra lại API Key.");
      }
    }
  };

  const saveProduct = async () => {
    const data = { ...form, gia: Number(form.gia) };
    if (params._docId) {
      await updateProduct(params._docId as string, data);
    } else {
      await addProduct(data);
    }
    navigateBack();
  };

  const navigateBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(screens)');
    }
  };

  return {
    form,
    setForm,
    loading,
    isScanning,
    showCategory,
    setShowCategory,
    isEditing,
    pickImage,
    saveProduct,
    navigateBack,
  };
};
