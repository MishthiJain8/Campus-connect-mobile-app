export type UserRole = 'student' | 'admin';

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type Campus = {
  id: string;
  name: string;
  city: string;
  state: string;
  description: string;
  studentCount: number;
};

export type Event = {
  id: string;
  campusId: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  location: string;
  isFeatured: boolean;
};

export type Profile = {
  id: string;
  userId: string;
  fullName: string;
  major: string;
  year: string;
  bio: string;
  interests: string[];
};

export type Message = {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  createdAt: string;
};

export type Bookmark = {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'event' | 'campus';
  createdAt: string;
};
