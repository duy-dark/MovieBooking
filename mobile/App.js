import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CardFilmFavorite from './src/components/film/CardFilmFavorite';
import CardFilmToday from './src/components/film/CardFilmToday'
import CardFilmComingSoon from './src/components/film/CardFilmComingSoon'
import CardFilm from './src/components/film/CardFilm';
import CardNews from './src/components/news/CardNews';
import CardNewsSummary from './src/components/news/CardNewsSummary';
import CardComment from './src/components/comments/CardComment';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <CardFilmFavorite />
      <CardFilmToday />
      <CardFilmComingSoon />
      <CardFilm />
      <CardNews />
      <CardNewsSummary />
      <CardComment />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  }
})
