import { currentUser } from '@clerk/nextjs/server';

import { db } from '@/lib/db';

export const getSelf = async () => {
  console.log('🔍 [AUTH] Getting current user from Clerk...');
  const self = await currentUser();
  
  console.log('👤 [AUTH] Clerk user data:', {
    id: self?.id,
    username: self?.username,
    exists: !!self
  });

  if (!self || !self.username) {
    console.error('❌ [AUTH] User not authenticated or missing username');
    throw new Error('Unauthorized');
  }

  console.log('🔎 [AUTH] Looking up user in database...');
  let user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  console.log('📊 [AUTH] Database user lookup result:', {
    found: !!user,
    userId: user?.id,
    username: user?.username,
    externalUserId: user?.externalUserId
  });

  if (!user) {
    console.log('🆕 [AUTH] User not found in database - creating new user...');
    try {
      user = await db.user.create({
        data: {
          externalUserId: self.id,
          username: self.username,
          imageUrl: self.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${self.username}`,
          stream: {
            create: {
              name: `${self.username}'s stream`,
            },
          },
        },
        include: {
          stream: true,
        },
      });
      
      console.log('✅ [AUTH] New user created successfully:', {
        id: user.id,
        username: user.username,
        externalUserId: user.externalUserId
      });
    } catch (error) {
      console.error('❌ [AUTH] Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  console.log('✅ [AUTH] User authenticated successfully');
  return user;
};

export const getSelfByUsername = async (username: string) => {
  console.log('🔍 [AUTH] Getting user by username:', username);
  const self = await currentUser();

  console.log('👤 [AUTH] Clerk user data for username lookup:', {
    id: self?.id,
    username: self?.username,
    exists: !!self
  });

  if (!self || !self.username) {
    console.error('❌ [AUTH] User not authenticated or missing username');
    throw new Error('Unauthorized');
  }

  console.log('🔎 [AUTH] Looking up user by username in database...');
  const user = await db.user.findUnique({
    where: { username },
  });

  console.log('📊 [AUTH] Database user lookup by username result:', {
    found: !!user,
    userId: user?.id,
    username: user?.username
  });

  if (!user) {
    console.error('❌ [AUTH] User not found in database by username');
    throw new Error('Not found');
  }

  console.log('🔒 [AUTH] Verifying username ownership...');
  if (self.username !== user.username) {
    console.error('❌ [AUTH] Username mismatch - unauthorized access attempt');
    throw new Error('Unauthorized');
  }

  console.log('✅ [AUTH] User verified by username successfully');
  return user;
};
