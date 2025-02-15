import {getProviders, signIn} from "next-auth/react"
export default function signin({providers}) {
  
    console.log("Received providers:", providers);  // This will show what you're actually getting in Vercel

    if (!providers || typeof providers !== 'object' || Object.keys(providers).length === 0) {
        console.error("Providers is undefined, null, or not an object:", providers);
        return <p>No providers available or providers data failed to load.</p>;
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

                </div>
            ))}
        </div>
    
  )
    
}

{/*import {getProviders, signIn} from "next-auth/react"

export default function signin({providers}) {

    
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

                </div>
            ))}
        </div>
    
  )
}




export async function getServerSideProps()
{

    
    const providers= await getProviders();
    return{
        props:{
            providers,
        },
    }
}

*/}

export async function getServerSideProps()
{

    
    const providers= await getProviders();

    if (!providers) {
        console.error("Failed to fetch providers or providers are empty");
        return { props: { providers: {} } };  // Pass an empty object to avoid runtime errors
    }


    return{
        props:{
            providers,
        },
    }

} 
    