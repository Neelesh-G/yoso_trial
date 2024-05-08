import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from '../../../firebase'; // Adjust the import path
import { doc, getDoc, setDoc } from 'firebase/firestore';
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages:{
    signIn:"/auth/signin"
  },

  callbacks:{
/*
    async jwt({ token, user }) {
      // Generate a custom token for Firebase Auth if a new user signs in
      console.log('JWT callback - user:', user); // Logs user details
      if (user) {
        try {
          const firebaseToken = await admin.auth().createCustomToken(user.id);
          console.log('JWT callback - firebaseToken:', firebaseToken);
          token.firebaseToken = firebaseToken;
        } catch (error) {
          console.error('Error generating Firebase custom token:', error);
        }
      }
      return token;
    },
  */

   /* async session({ session, token, user }) {
      // Append Firebase token to the session
      console.log('Session callback - token:', token);
      session.user.firebaseToken = token.firebaseToken;
      return session;
    },*/
    async session({session, token, user})
    {
    session.user.username=session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase(),
    session.user.uid=token.sub
    return session;
    }

    

  },
  
  events: {


    
    signIn: async ({ user, account, profile, isNewUser }) => {
      const userRef = doc(db, 'users', user.id);
      
      try {
        // Check if the user document exists
        const docSnap = await getDoc(userRef);
  
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            id:session.user.uid,
            name: user.name, 
            email: user.email, 
            image: user.image, 
          });
        }
      } catch (error) {
        console.error("Error updating user document in Firestore:", error);
      }
    },
    

  },
  



}

export default NextAuth(authOptions)