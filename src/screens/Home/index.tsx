import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import { gameApi } from '../../api/game.api';
import logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, IGameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<IGameCardProps[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    gameApi.findAll().then(({ data }) => setGames(JSON.parse(data)));
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(game) => game.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              activeOpacity={0.5}
              onPress={() => navigate('game', item)}
            />
          )}
        />
      </View>
    </Background>
  );
}
