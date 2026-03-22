import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { styles } from './styles';
import { colors } from '../../theme/colors';

type CustomLoadingOverlayProps = {
  visible: boolean;
};

const CustomLoadingOverlay = ({ visible }: CustomLoadingOverlayProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

export default CustomLoadingOverlay;