import React ,{useEffect, useState}from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, Pen } from 'lucide-react'

const Header = () => {
    const {user}=useUser();
    const [showSignIn, setShowSignIn] = useState(false)
    const handleOverlay=(e)=>{
        // e.target :- This refers to the exact element that the user clicked on.
        // e.currentTarget :- This refers to the element that the event listener is attached to means background.
        if(e.target===e.currentTarget){
            setShowSignIn(false);
            setSearch({})
        }
    }

    const [search,setSearch]=useSearchParams();
    useEffect(() => {
        if(search.get('sign-in')){
            setShowSignIn(true);
        }
    }, [search])
    

    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link>
                    <img src='/logo.png' className='h-20' />
                </Link>
                <SignedOut>
                <Button variant="outline" onClick={()=>{setShowSignIn(true)}}>Login</Button>
                </SignedOut>
                <SignedIn>
                    {/* add condition */}
                    <div className='flex'>
                        {user?.unsafeMetadata?.role === 'recruiter' && (
                            <div>
                                <Link to='/postJob'>
                                    <Button variant="destructive" className="rounded-full mr-6">
                                        <Pen size={20} className='mt-1' />
                                        Post a Job
                                    </Button>
                                </Link>
                            </div>
                        )}
                        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
                            <UserButton.MenuItems>
                                <UserButton.Link href="/myJob" label='My Jobs' labelIcon={<BriefcaseBusiness size={15} />} />
                                <UserButton.Link href="/savedJob" label='Saved Job' labelIcon={<Heart size={15} />} />
                            </UserButton.MenuItems>
                        </UserButton>
                    </div>
                </SignedIn>
            </nav>
            {showSignIn && (
                <div className='fixed  inset-0 flex items-center justify-center'
                onClick={handleOverlay}>
                    <SignIn
                    signUpForceRedirectUrl='/onBoarding'
                    fallbackRedirectUrl='/onBoarding'
                    />
                </div>
            )}
        </>
    )
}

export default Header


    
                