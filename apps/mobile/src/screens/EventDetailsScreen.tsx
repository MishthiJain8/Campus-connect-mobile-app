import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function EventDetailsScreen({ route }: any) {
  const { event } = route.params || {};

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Event details unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.subtitle}>{event.location}</Text>
      <Text style={styles.timestamp}>{new Date(event.startsAt).toLocaleString()}</Text>
      <Text style={styles.body}>{event.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#07102A',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#8B9ED0',
    marginBottom: 14,
  },
  timestamp: {
    color: '#5B7FFF',
    marginBottom: 22,
  },
  body: {
    color: '#D2DAF2',
    fontSize: 16,
    lineHeight: 22,
  },
  message: {
    color: '#fff',
    margin: 20,
  },
});
