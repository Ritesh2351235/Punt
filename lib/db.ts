import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Enhanced Prisma client with logging
const createPrismaClient = () => {
  console.log('🗄️ [DATABASE] Initializing Prisma client...');
  
  const prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'warn' },
    ],
  });

  // Log database queries
  prisma.$on('query', (e) => {
    console.log('📊 [DATABASE] Query executed:', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`
    });
  });

  // Log database errors
  prisma.$on('error', (e) => {
    console.error('❌ [DATABASE] Error:', e);
  });

  // Log database info
  prisma.$on('info', (e) => {
    console.log('ℹ️ [DATABASE] Info:', e.message);
  });

  // Log database warnings
  prisma.$on('warn', (e) => {
    console.warn('⚠️ [DATABASE] Warning:', e.message);
  });

  console.log('✅ [DATABASE] Prisma client initialized successfully');
  return prisma;
};

export const db = globalThis.prisma || createPrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
