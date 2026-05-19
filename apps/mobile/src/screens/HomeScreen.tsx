import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../App';
import { apiRequest } from '../api/client';

type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
};

export function HomeScreen({ navigation }: any) {
  const { signOut, token } = useContext(AuthContext);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiRequest('/events', 'GET', undefined, token || undefined);
        setEvents(data);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus Events</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#5B7FFF" />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { event: item })}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
      <TouchableOpacity style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07102A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
  },
  actionButton: {
    backgroundColor: '#1B2A57',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  actionText: {
    color: '#5B7FFF',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#121D41',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: '#8B9ED0',
    marginBottom: 10,
  },
  cardDescription: {
    color: '#D2DAF2',
    lineHeight: 20,
  },
  signOut: {
    marginTop: 14,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FF7F7F',
    fontWeight: '700',
  },
});
