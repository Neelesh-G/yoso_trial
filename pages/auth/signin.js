import {getProviders, signIn} from "next-auth/react"

export default function signin({providers}) {

    if (!providers) {
        return <p>No providers available or providers data failed to load.  {providers}</p>;
      }
  return (
    
        
        

        <div className="flex justify-center mt-40">

            {Object.values(providers).map((provider)=>(
                <div key={provider.name} className="flex flex-col items-center">
                    <div className="flex items-center">
                        <img className="h-20 w-25 object-cover" src="https://thumbs.dreamstime.com/z/print-171223965.jpg" 
                        alt="Y part of Yoso"/>
                        <span className="text-5xl font-bold" style={{ color: '#87cdf5' }}>oso</span>
                    </div>
                    <p className="text-center text-xl  my-10">Welcome to Yoso, your biggest workplace advocate</p>
                    <button onClick={()=>signIn(provider.id, {callbackUrl:"/"})} className="bg-sky-300 rounded-lg p-3 text-white hover:bg-sky-500">Sign in with {provider.name}</button>
                    <button onClick={()=>signIn(provider.id, {callbackUrl:"/"})} className="bg-sky-300 rounded-lg p-3 text-white hover:bg-sky-500">Sign in with {provider.name}</button>

                </div>
            ))}
        </div>
    
  )
}



/*
export async function getServerSideProps()
{

    
    const providers= await getProviders();
    return{
        props:{
            providers,
        },
    }
}*/


import { getProviders } from "next-auth/react";

export async function getServerSideProps(context) {
    let providers = null;
    try {
        providers = await getProviders();
        if (!providers) {
            throw new Error('No authentication providers found.');
        }
    } catch (error) {
        console.error('Failed to fetch providers:', error);
        // Optionally, return an error message to display or handle it in the component
        return {
            props: {
                error: 'Failed to fetch authentication providers.'
            },
        };
    }

    return {
        props: {
            providers,
        },
    };
}

