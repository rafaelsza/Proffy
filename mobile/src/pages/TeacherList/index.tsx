import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('@Proffys/favorites').then(response => {
      if (response) {
        const favoredTeachers = JSON.parse(response);
        const favoredTeachersIds = favoredTeachers.map(
          (teacher: Teacher) => teacher.id,
        );

        setFavorites(favoredTeachersIds);
      }
    });
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  async function handleFilterSubmits() {
    loadFavorites();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day: weekDay,
        time,
      },
    });

    setIsFilterVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      {/* eslint-disable react/jsx-wrap-multilines */}
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            onPress={() => setIsFilterVisible(!isFiltersVisible)}
          >
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bbcc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bbcc"
                  value={weekDay}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bbcc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmits}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favored={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
