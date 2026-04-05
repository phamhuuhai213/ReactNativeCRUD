import React, { useState } from 'react';
import {
  View, StyleSheet, Alert, Text, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { loginUser, registerUser } from '../services/authService';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppColors, Shadows, Spacing, Radius } from '../constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await loginUser(email, password);
        router.replace('/(screens)');
      } else {
        await registerUser(email, password);
        Alert.alert('Thành công', 'Đăng ký thành công!');
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert('Lỗi', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Background decorative shapes */}
      <View style={styles.bgShapeTopLeft} />
      <View style={styles.bgShapeTopRight} />
      <View style={styles.bgShapeBottomLeft} />
      <View style={styles.bgShapeBottomRight} />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(600)} style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="shield-account" size={48} color={AppColors.primary} />
            </View>
            <Text style={styles.logoText}>ADMIN PORTAL</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Sign In to Your Account</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account-outline" size={24} color={AppColors.iconDefault} style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              mode="flat"
              underlineColor={AppColors.inputUnderline}
              activeUnderlineColor={AppColors.primary}
              contentStyle={styles.inputContent}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={AppColors.iconDefault} style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              style={styles.input}
              mode="flat"
              underlineColor={AppColors.inputUnderline}
              activeUnderlineColor={AppColors.primary}
              contentStyle={styles.inputContent}
              right={
                <TextInput.Icon
                  icon={secureText ? 'eye-off' : 'eye'}
                  onPress={() => setSecureText(!secureText)}
                />
              }
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleAuth}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.signInText}>
              {loading ? 'Đang xử lý...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Bottom Links */}
          <View style={styles.bottomLinks}>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.linkText}>
                {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.linkText}>Need Help?</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ──────────────────────────────────────────────
const BG_SHAPE_BASE = {
  position: 'absolute' as const,
  transform: [{ rotate: '45deg' }],
  borderRadius: Radius.lg,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColors.bgLogin,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  bgShapeTopLeft: {
    ...BG_SHAPE_BASE,
    top: 40,
    left: -30,
    width: 120,
    height: 120,
    backgroundColor: 'rgba(200, 210, 230, 0.4)',
  },
  bgShapeTopRight: {
    ...BG_SHAPE_BASE,
    top: 60,
    right: -20,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(180, 190, 220, 0.3)',
  },
  bgShapeBottomLeft: {
    ...BG_SHAPE_BASE,
    bottom: 80,
    left: -20,
    width: 110,
    height: 110,
    backgroundColor: 'rgba(200, 210, 230, 0.35)',
  },
  bgShapeBottomRight: {
    ...BG_SHAPE_BASE,
    bottom: 100,
    right: -30,
    width: 130,
    height: 130,
    backgroundColor: 'rgba(180, 190, 220, 0.25)',
  },
  content: {
    paddingHorizontal: Spacing.xxxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: AppColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: AppColors.primary,
    letterSpacing: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: AppColors.textDark,
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: Spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  inputContent: {
    paddingLeft: 0,
  },
  signInButton: {
    backgroundColor: AppColors.primary,
    borderRadius: Radius.full,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxxl,
    ...Shadows.button,
  },
  signInText: {
    color: AppColors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xl,
  },
  linkText: {
    color: AppColors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
