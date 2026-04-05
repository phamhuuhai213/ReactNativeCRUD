import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { changeUserPassword, logoutUser, getCurrentUser } from '../../services/authService';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppColors, Shadows, Spacing, Radius } from '../../constants/theme';

export default function ProfileScreen() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự trở lên');
      return;
    }

    const user = getCurrentUser();
    if (user) {
      setLoading(true);
      try {
        await changeUserPassword(user, password);
        Alert.alert('Thành công', 'Đổi mật khẩu thành công');
        setPassword('');
      } catch (error: any) {
        Alert.alert('Lỗi', error.message || 'Không thể đổi mật khẩu. Bạn có thể cần đăng nhập lại.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Lỗi', 'Đăng xuất thất bại');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(500)} style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>Settings</Text>

        {/* User Info Card */}
        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarCircle}>
              <MaterialCommunityIcons name="account" size={40} color={AppColors.primary} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.emailText}>{getCurrentUser()?.email}</Text>
              <Text style={styles.roleText}>Administrator</Text>
            </View>
          </View>
        </View>

        {/* Change Password Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={22} color={AppColors.iconDefault} style={styles.inputIcon} />
            <TextInput
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureText}
              mode="flat"
              underlineColor={AppColors.separator}
              activeUnderlineColor={AppColors.primary}
              style={styles.input}
              contentStyle={styles.inputContent}
              right={
                <TextInput.Icon
                  icon={secureText ? 'eye-off' : 'eye'}
                  onPress={() => setSecureText(!secureText)}
                />
              }
            />
          </View>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handleUpdatePassword}
            activeOpacity={0.8}
          >
            <Text style={styles.updateBtnText}>
              {loading ? 'Đang xử lý...' : 'Update Password'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="logout" size={22} color={AppColors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgLight,
    paddingTop: Spacing.screenTop,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: AppColors.primary,
    marginBottom: Spacing.xxl,
  },
  card: {
    backgroundColor: AppColors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: AppColors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 14,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textDark,
  },
  roleText: {
    fontSize: 13,
    color: AppColors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  inputIcon: {
    marginRight: Spacing.sm,
    marginTop: 6,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 15,
  },
  inputContent: {
    paddingLeft: 0,
  },
  updateBtn: {
    backgroundColor: AppColors.primary,
    borderRadius: Radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
  },
  updateBtnText: {
    color: AppColors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.light,
    borderWidth: 1,
    borderColor: AppColors.dangerBorder,
  },
  logoutText: {
    color: AppColors.danger,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Spacing.sm,
  },
});
