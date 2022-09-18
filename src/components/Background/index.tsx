import React, { ReactNode } from 'react';
import { ImageBackground } from 'react-native';
import background from './../../assets/background-galaxy.png';
import { styles } from './styles';

interface IProps {
  children: ReactNode;
}

export function Background(props: IProps) {
  return (
    <ImageBackground
      source={background}
      defaultSource={background}
      style={styles.container}
    >
      {props.children}
    </ImageBackground>
  );
}
