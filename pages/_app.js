import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { app } from '../firebase'; 
import { RecoilRoot } from 'recoil';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';



function MyApp({ Component, pageProps:{session, ...pageProps} }) {

/*
return(
  <SessionProvider session={session}>
    < RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
       
  </SessionProvider>
);      
}
export default MyApp
*/

return (
  <SessionProvider session={session}>
    <RecoilRoot>
      <AuthSync />
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
);
}

// A component to handle Firebase Auth synchronization with NextAuth session
function AuthSync() {
const { data: session } = useSession();

useEffect(() => {
  // Check if the session exists and contains a firebaseToken
  const auth = getAuth(app); // Ensure Firebase is initialized

  if (session?.user?.firebaseToken) {
    signInWithCustomToken(auth, session.user.firebaseToken).catch((error) => {
      console.error('Firebase custom token sign-in error:', error);
    });
  }
}, [session]);

// Render nothing; this component only handles side effects
return null;
}

export default MyApp;
