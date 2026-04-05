import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FAB } from 'react-native-paper';

import SearchHeader from '../../components/SearchHeader';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { AppColors, Spacing } from '../../constants/theme';

export default function AdminList() {
  const router = useRouter();
  const { search, setSearch, filteredProducts, confirmDelete, handleEdit } =
    useProducts();

  return (
    <View style={styles.container}>
      <SearchHeader search={search} onSearchChange={setSearch} />

      <Text style={styles.title}>Product List</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._docId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            index={index}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/add-product')}
        color={AppColors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgLight,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.screenTop,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: AppColors.primary,
    marginBottom: Spacing.lg,
  },
  fab: {
    position: 'absolute',
    margin: Spacing.lg,
    right: 4,
    bottom: 4,
    backgroundColor: AppColors.primary,
    borderRadius: 30,
  },
});

