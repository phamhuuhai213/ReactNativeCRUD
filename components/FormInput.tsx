import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AppColors, Radius, Spacing } from '../constants/theme';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
}

export default function FormInput({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
}: FormInputProps) {
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
        mode="flat"
        underlineColor={AppColors.separator}
        activeUnderlineColor={AppColors.accent}
        contentStyle={styles.inputContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: Spacing.xs,
    marginTop: Spacing.sm,
  },
  input: {
    backgroundColor: AppColors.bgInput,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    fontSize: 15,
  },
  inputContent: {
    paddingVertical: 10,
  },
});
