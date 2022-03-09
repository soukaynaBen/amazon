import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    NEXTAUTH_URL=process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET=process.env.NEXTAUTH_SECRET 
    // ...add more providers here
  ],
})