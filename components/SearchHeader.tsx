import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors, Shadows, Spacing } from '../constants/theme';

interface Props {
  search: string;
  onSearchChange: (text: string) => void;
}

export default function SearchHeader({ search, onSearchChange }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color={AppColors.iconDefault} />
        <TextInput
          placeholder="Search Products"
          value={search}
          onChangeText={onSearchChange}
          style={styles.searchInput}
          placeholderTextColor={AppColors.textPlaceholder}
        />
      </View>
      <TouchableOpacity style={styles.avatarBtn}>
        <MaterialCommunityIcons name="account-circle" size={36} color={AppColors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 25,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    ...Shadows.light,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 15,
    color: AppColors.textPrimary,
  },
  avatarBtn: {
    marginLeft: Spacing.md,
  },
});
