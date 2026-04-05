import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addProduct, updateProduct } from '../services/productService';
import { fetchProductImage, pickImageFromLibrary } from '../services/imageService';

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
    if (imageUri) {
      setForm((prev) => ({ ...prev, hinhanh: imageUri }));
    }
    setLoading(false);
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
      router.replace('/(admin)');
    }
  };

  return {
    form,
    setForm,
    loading,
    showCategory,
    setShowCategory,
    isEditing,
    pickImage,
    saveProduct,
    navigateBack,
  };
};
