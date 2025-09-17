// middleware.ts (at repo root or /src)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', // home
  '/sign-in(.*)', // auth pages
  '/sign-up(.*)',
  '/search',
  '/api/webhooks/livekit', // LiveKit webhooks
  '/api/uploadthing', // uploads endpoint (public if you expect unauthenticated)
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.url;
  const pathname = new URL(url).pathname;
  const isPublic = isPublicRoute(req);
  
  console.log('🛡️ [MIDDLEWARE] Request:', {
    path: pathname,
    method: req.method,
    isPublic: isPublic
  });
  
  if (!isPublic) {
    console.log('🔒 [MIDDLEWARE] Protected route - checking authentication...');
    try {
      await auth.protect();
      console.log('✅ [MIDDLEWARE] Authentication successful');
    } catch (error) {
      console.error('❌ [MIDDLEWARE] Authentication failed:', error);
      throw error;
    }
  } else {
    console.log('🌐 [MIDDLEWARE] Public route - skipping auth check');
  }
});

// This matcher is Clerk’s recommended default for App Router
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
