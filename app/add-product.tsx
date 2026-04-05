import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CategoryModal from '../components/CategoryModal';
import ImageUploadArea from '../components/ImageUploadArea';
import FormInput from '../components/FormInput';
import { useProductForm } from '../hooks/useProductForm';
import { AppColors, Radius, Spacing } from '../constants/theme';

export default function AddProduct() {
  const {
    form,
    setForm,
    loading,
    showCategory,
    setShowCategory,
    isEditing,
    pickImage,
    saveProduct,
    navigateBack,
  } = useProductForm();

  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(400)}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.headerBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        </Text>
        <TouchableOpacity onPress={saveProduct} style={styles.headerBtn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.saveText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Image Area */}
      <ImageUploadArea
        imageUri={form.hinhanh}
        loading={loading}
        onPickImage={pickImage}
      />

      {/* Form Fields */}
      <FormInput
        label="Mã sản phẩm"
        value={form.idsanpham}
        onChangeText={(t) => setForm({ ...form, idsanpham: t })}
      />

      <FormInput
        label="Tên sản phẩm"
        value={form.tensp}
        onChangeText={(t) => setForm({ ...form, tensp: t })}
      />

      <Text style={styles.fieldLabel}>Danh mục</Text>
      <TouchableOpacity
        style={styles.dropdownBtn}
        onPress={() => setShowCategory(true)}
        activeOpacity={0.7}
      >
        <Text style={form.loaisp ? styles.dropdownText : styles.dropdownPlaceholder}>
          {form.loaisp || 'Chọn danh mục'}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={22} color={AppColors.textMuted} />
      </TouchableOpacity>

      {/* Category Modal */}
      <CategoryModal
        visible={showCategory}
        selected={form.loaisp}
        onSelect={(cat) => {
          setForm({ ...form, loaisp: cat });
          setShowCategory(false);
        }}
        onClose={() => setShowCategory(false)}
      />

      <FormInput
        label="Giá"
        value={form.gia.toString()}
        onChangeText={(t) => setForm({ ...form, gia: t })}
        keyboardType="numeric"
      />

      <View style={{ height: 30 }} />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgForm,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.screenTop,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  cancelText: {
    fontSize: 16,
    color: AppColors.accent,
    fontWeight: '600',
  },
  headerBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  saveText: {
    fontSize: 16,
    color: AppColors.accent,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textDark,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppColors.bgInput,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.separator,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Radius.sm,
  },
  dropdownText: {
    fontSize: 15,
    color: AppColors.textDark,
  },
  dropdownPlaceholder: {
    fontSize: 15,
    color: AppColors.textPlaceholder,
  },
});
