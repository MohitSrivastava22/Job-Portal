import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, useLocation, } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {isSignedIn ,user,isLoaded}=useUser()
   //isSignedIn  tell whether is loigin or not 
   //user   give all detail of the user
   // isLoaded   tell whether all data of user is loaded or not
   //to get token from clerk we use  useSession  example const {session} = useSession  session.getToken now send this token to the supabase client to access 
   const { pathname } = useLocation(); 
    if(isLoaded&&!isSignedIn&&isSignedIn!=undefined){
       return  <Navigate to='/?sign-in=true'/>  // sign-in refer to Header.jsx
    }

    // check onBoarding status
    if(user!==undefined&&!user?.unsafeMetadata?.role &&pathname!=='/onBoarding') {
      return <Navigate to="/onBoarding"/>
    }
 return children;
}

export default ProtectedRoute
