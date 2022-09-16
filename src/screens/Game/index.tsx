import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, IDuo } from '../../components/DuoCard';
import { IGameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const game = useRoute().params as IGameCardProps;
  const { goBack } = useNavigation();
  const [duos, setDuos] = useState<IDuo[]>([]);

  useEffect(() => {
    fetch(`http://192.168.1.14/api/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={goBack} activeOpacity={0.5}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => null} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyContentList
          }
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
