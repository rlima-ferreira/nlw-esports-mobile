import { GameController } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';

export interface IDuo {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: string;
  weekDays: string;
  yearsPlaying: number;
}

interface IProps {
  data: IDuo;
  onConnect: () => void;
}

export function DuoCard(props: IProps) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={props.data.name}></DuoInfo>
      <DuoInfo
        label="Tempo de Jogo"
        value={`${props.data.yearsPlaying} anos`}
      ></DuoInfo>
      <DuoInfo
        label="Disponibilidade"
        value={`${props.data.weekDays.length} dias \u2022 ${props.data.hourStart} - ${props.data.hourEnd}`}
      ></DuoInfo>
      <DuoInfo
        label="Chamada de áudio"
        value={props.data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={
          props.data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      ></DuoInfo>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={props.onConnect}
      >
        <GameController color={THEME.COLORS.TEXT} size={20} />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
