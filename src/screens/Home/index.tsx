import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, IGameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<IGameCardProps[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    fetch('http://192.168.0.14:3000/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data));
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
