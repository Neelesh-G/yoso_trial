import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from '../../../firebase'; // Adjust the import path
import { doc, getDoc, setDoc } from 'firebase/firestore';

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