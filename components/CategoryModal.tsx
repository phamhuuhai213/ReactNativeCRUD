import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/categories';
import { AppColors, Radius, Spacing } from '../constants/theme';

interface Props {
  visible: boolean;
  selected: string;
  onSelect: (category: string) => void;
  onClose: () => void;
}

export default function CategoryModal({ visible, selected, onSelect, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Chọn danh mục</Text>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selected === item && styles.itemActive,
                ]}
                onPress={() => onSelect(item)}
              >
                <Text
                  style={[
                    styles.itemText,
                    selected === item && styles.itemTextActive,
                  ]}
                >
                  {item}
                </Text>
                {selected === item && (
                  <MaterialCommunityIcons name="check" size={20} color={AppColors.accent} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColors.overlay,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
    maxHeight: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: AppColors.textDark,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
  },
  itemActive: {
    backgroundColor: AppColors.accentLight,
  },
  itemText: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  itemTextActive: {
    color: AppColors.accent,
    fontWeight: '600',
  },
});
