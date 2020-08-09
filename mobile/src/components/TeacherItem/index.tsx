import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favored: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favored }) => {
  const [isFavored, setIsFavored] = useState(favored);

  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('@Proffys/favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavored) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacherItem: Teacher) => teacherItem.id === teacher.id,
      );

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavored(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavored(true);
    }

    await AsyncStorage.setItem(
      '@Proffys/favorites',
      JSON.stringify(favoritesArray),
    );
  }

  function handleLinkToWhatsApp() {
    api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          {`Preço/hora   `}
          <Text style={styles.priceValue}>
            R$
            {teacher.cost}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavored ? styles.favored : {}]}
          >
            {isFavored ? (
              <Image source={heartOutlineIcon} />
            ) : (
              <Image source={unFavoriteIcon} />
            )}
          </RectButton>

          {/* eslint-disable react/jsx-curly-newline */}
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsApp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
