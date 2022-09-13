import React from 'react';
import { FlatList, Image, View } from 'react-native';

import logo from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Heading
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={GAMES}
        keyExtractor={(game) => game.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
        renderItem={({ item }) => <GameCard data={item} />}
      />
    </View>
  );
}
