import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import FetchUsers from '../components/FetchUsers'
import { useEffect, useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"
import Navbar from '../components/Navbar'

export default function Home() {

  const { data: session } = useSession()
  const [albums, setAlbums] = useState([])

  function handleSignOut(){
    signOut()
  }

  function queryAlbums(){
    fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => console.log(data))
  }

 useEffect(() => {
    const fetchData = async () => {
      const result = await queryAlbums();
      //add value to setAlbums knowing it is an array of objects
      setAlbums({userId: 1, id: 4});
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut}) : Guest()}
    </div>
  )
}

// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, handleSignOut, albums }){
   const [users, setUsers] = useState([]);
   const [totalAlbums, setTotalAlbums] = useState(0);
   const queryUsers = async () => {
     const res = await fetch("https://jsonplaceholder.typicode.com/users");
     const data = await res.json();
     setUsers(data);
   };
   const albumsPerUser = async (userId) => {
     {
       /*Loop over albums at https://jsonplaceholder.typicode.com/albums and return the number of albums for each user with userId===userId passed in as a parameter.*/
     }
     const albums = await fetch("https://jsonplaceholder.typicode.com/albums");
     const data = await albums.json();
     const albumsPerUser = data.filter((album) => album.userId === userId);

     const album_length = await albumsPerUser.length;
     return album_length;
   };
  return (
    <div>
      <Navbar />
      <main className="container mx-auto text-center py-20">
        <FetchUsers />
      </main>
    </div>
  );
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}