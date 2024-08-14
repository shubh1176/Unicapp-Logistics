import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { withClerkMiddleware } from '@clerk/nextjs/server';

export default withClerkMiddleware(async (req) => {
  const { userId } = req.auth;

  // Redirect to sign-in if user is not authenticated
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Admin panel specific logic
  if (req.nextUrl.pathname.startsWith('/dashboard/admin-panel')) {
    try {
      // Fetch user data
      const fetchedUser = await db
        .select()
        .from(schema.UserData)
        .where(eq(schema.UserData.clerkUserId, userId))
        .then(result => result[0]);

      // If the user is not an admin, redirect to the dashboard
      if (!fetchedUser || !fetchedUser.isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/admin-panel'],
};
