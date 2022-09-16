import React from 'react';
import { ColorValue, Text, View } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

interface IProps {
  label: string;
  value: string;
  colorValue?: ColorValue;
}

export function DuoInfo({
  label,
  value,
  colorValue = THEME.COLORS.TEXT,
}: IProps) {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <Text numberOfLines={1} style={[styles.value, { color: colorValue }]}>
        {value}
      </Text>
    </View>
  );
}
