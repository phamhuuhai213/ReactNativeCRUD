/**
 * Design tokens cho toàn bộ app.
 * Import { AppColors, Spacing, Shadows, Typography } from '@/constants/theme'
 */

import { Platform, ViewStyle } from 'react-native';

// ─── Colors ──────────────────────────────────────────────
export const AppColors = {
  // Primary palette
  primary: '#1B3A5C',
  primaryLight: '#E8EDF5',
  accent: '#5B7FFF',
  accentLight: '#EEF0FF',
  accentBorder: '#D8DCFF',

  // Backgrounds
  bgLight: '#EEF2F9',
  bgForm: '#FAFAFF',
  bgLogin: '#F0F2F8',
  bgInput: '#F7F8FB',
  white: '#FFFFFF',

  // Text
  textDark: '#222',
  textPrimary: '#333',
  textSecondary: '#555',
  textMuted: '#888',
  textPlaceholder: '#aaa',
  textCategory: '#5A6A85',

  // Status / Actions
  danger: '#e74c3c',
  dangerBorder: '#fdd',
  success: '#27ae60',

  // Misc
  iconDefault: '#999',
  iconEdit: '#666',
  overlay: 'rgba(0,0,0,0.4)',
  separator: '#ddd',
  inputUnderline: '#ccc',
} as const;

// ─── Spacing ─────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  screenTop: 50,
} as const;

// ─── Shadows ─────────────────────────────────────────────
export const Shadows = {
  card: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  } as ViewStyle,

  light: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  } as ViewStyle,

  button: {
    elevation: 4,
    shadowColor: '#1B3A5C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  } as ViewStyle,

  tabBar: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  } as ViewStyle,
} as const;

// ─── Typography ──────────────────────────────────────────
export const Typography = {
  heading: { fontSize: 26, fontWeight: '800' as const },
  title: { fontSize: 18, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '600' as const },
  button: { fontSize: 17, fontWeight: '700' as const },
} as const;

// ─── Border Radius ───────────────────────────────────────
export const Radius = {
  sm: 4,
  md: 10,
  lg: 16,
  xl: 20,
  pill: 25,
  full: 30,
} as const;

// ─── Legacy exports (giữ lại để tương thích) ─────────────
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
