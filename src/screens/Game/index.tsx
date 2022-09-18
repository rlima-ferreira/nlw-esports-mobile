import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { adApi } from '../../api/ad.api';
import { gameApi } from '../../api/game.api';
import logo from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { DuoCard, IDuo } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { IGameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';

export function Game() {
  const game = useRoute().params as IGameCardProps;
  const { goBack } = useNavigation();
  const [duos, setDuos] = useState<IDuo[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  useEffect(() => {
    gameApi.findWithAds(game.id).then(({ data }) => setDuos(JSON.parse(data)));
  }, []);

  async function getDiscordUser(id: string) {
    try {
      const { data, statusText, status } = await adApi.findWithDiscord(id);
      if (status !== 200) throw new Error(statusText);
      console.log(data);
      setDiscordDuoSelected(JSON.parse(data).discord);
    } catch (error) {
      Alert.alert('Erro', new Error(error).message);
    }
  }

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
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
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
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
