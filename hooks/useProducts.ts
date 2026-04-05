import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ProductWithId,
  subscribeProducts,
  deleteProduct,
} from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeProducts(setProducts);
    return () => unsubscribe();
  }, []);

  const confirmDelete = (docId: string) => {
    Alert.alert('Xác nhận', 'Bạn có muốn xóa sản phẩm này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', onPress: () => deleteProduct(docId), style: 'destructive' },
    ]);
  };

  const handleEdit = (item: ProductWithId) => {
    router.push({
      pathname: '/add-product',
      params: {
        _docId: item._docId,
        idsanpham: item.idsanpham,
        tensp: item.tensp,
        loaisp: item.loaisp,
        gia: String(item.gia),
      },
    });
  };

  const filteredProducts = products.filter((p) =>
    p.tensp.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    products,
    search,
    setSearch,
    filteredProducts,
    confirmDelete,
    handleEdit,
  };
};
