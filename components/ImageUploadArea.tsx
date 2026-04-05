import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors, Radius, Spacing } from '../constants/theme';

interface ImageUploadAreaProps {
  imageUri: string;
  loading: boolean;
  onPickImage: () => void;
}

export default function ImageUploadArea({
  imageUri,
  loading,
  onPickImage,
}: ImageUploadAreaProps) {
  return (
    <>
      <TouchableOpacity
        style={[styles.uploadArea, imageUri ? styles.uploadAreaWithImage : null]}
        onPress={onPickImage}
        activeOpacity={0.7}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        ) : (
          <>
            <MaterialCommunityIcons
              name="cloud-upload-outline"
              size={48}
              color={AppColors.textPlaceholder}
            />
            <Text style={styles.uploadTitle}>Tải ảnh lên</Text>
            <Text style={styles.uploadSubtitle}>
              {loading ? 'Đang tải lên...' : 'Nhấn để chọn ảnh'}
            </Text>
          </>
        )}
      </TouchableOpacity>
      {imageUri ? (
        <TouchableOpacity onPress={onPickImage}>
          <Text style={styles.changeImageText}>Nhấn vào ảnh để đổi ảnh khác</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  uploadArea: {
    backgroundColor: AppColors.accentLight,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.accentBorder,
    borderStyle: 'dashed',
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  uploadAreaWithImage: {
    paddingVertical: 0,
    borderStyle: 'solid',
    borderColor: AppColors.accentBorder,
  },
  uploadedImage: {
    width: '100%',
    height: 220,
    borderRadius: Radius.lg,
  },
  changeImageText: {
    fontSize: 13,
    color: AppColors.accent,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: '500',
  },
  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.textSecondary,
    marginTop: Spacing.sm,
  },
  uploadSubtitle: {
    fontSize: 13,
    color: AppColors.textPlaceholder,
    marginTop: Spacing.xs,
  },
});
