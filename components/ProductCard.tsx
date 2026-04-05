import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors, Shadows, Radius, Spacing } from '../constants/theme';
import { ProductWithId } from '../services/productService';

interface Props {
  product: ProductWithId;
  index: number;
  onEdit: (product: ProductWithId) => void;
  onDelete: (docId: string) => void;
}

export default function ProductCard({ product, index, onEdit, onDelete }: Props) {
  return (
    <Animated.View entering={FadeInUp.delay(index * 80).duration(400)}>
      <View style={styles.card}>
        <Image
          source={{ uri: product.hinhanh || 'https://via.placeholder.com/100' }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {product.tensp}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.loaisp}</Text>
          </View>
          <Text style={styles.price}>
            {Number(product.gia).toLocaleString()} VNĐ
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(product)} style={styles.actionBtn}>
            <MaterialCommunityIcons name="pencil-outline" size={22} color={AppColors.iconEdit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(product._docId)} style={styles.actionBtn}>
            <MaterialCommunityIcons name="delete-outline" size={22} color={AppColors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: AppColors.textDark,
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.primaryLight,
    borderRadius: Radius.md,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.textCategory,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionBtn: {
    padding: 6,
  },
});
