import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../App';
import { apiRequest } from '../api/client';

export function ProfileScreen() {
  const { userId, token } = useContext(AuthContext);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      const data = await apiRequest(`/profiles/${userId}`, 'GET', undefined, token || undefined);
      setProfile(data);
    };
    fetchProfile();
  }, [token, userId]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.name}>{profile.fullName}</Text>
      <Text style={styles.detail}>{profile.major} • {profile.year}</Text>
      <Text style={styles.sectionTitle}>Bio</Text>
      <Text style={styles.body}>{profile.bio || 'Share your campus story and interests.'}</Text>
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.tagContainer}>
        {(profile.interests || []).map((interest: string) => (
          <View style={styles.tag} key={interest}>
            <Text style={styles.tagText}>{interest}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07102A',
  },
  loading: {
    color: '#fff',
    margin: 20,
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  detail: {
    color: '#8B9ED0',
    fontSize: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#5B7FFF',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  body: {
    color: '#D2DAF2',
    lineHeight: 22,
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#1E2A58',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 8,
  },
  tagText: {
    color: '#A7B0CB',
  },
});
