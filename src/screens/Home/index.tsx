import { useEffect, useState } from "react";
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from "../../components/Background";
import { useNavigation } from '@react-navigation/native';

import { Heading } from '../../components/Background/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard/ index';

import { GAMES } from '../../utils/games'

import { styles } from './styles';

export function Home() {
  const[games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
      fetch('http://192.168.0.16:4444/games')
      .then(response => response.json())
      .then(data => setGames(data))  ;  
  }, [])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image
      source = {logoImg}
      style = {styles.logo}
      />

      <Heading
      title='Encontre seu duo!'
      subtitle='Selecione o game que você deseja jogar'
      />

      <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <GameCard
        data={item}
        onPress={() => handleOpenGame(item)}
        />


      )} 
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.contentList}
    />
    </SafeAreaView>
    </Background>
  );
}