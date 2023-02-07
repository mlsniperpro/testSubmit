import React, { useEffect } from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';



function UserDetails() {
  const router = useRouter()
  const { id } = router.query
  const userId = parseInt(id);
  const [name, setName] = useState('');
  const [albums, setAlbums] = useState([]);
  const getUserAlbums = async (userId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    const data = await res.json();
    setAlbums(data);
    console.log(data);
  };
  useEffect(() => {
    
    getUserAlbums(userId);
  }, []);

  const getUsername = async (userId) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const data = await res.json();
    return data.name;
  };

  return (
    <div>
      <h1>
        {getUsername(userId).then((name_) => {
          setName(name_);
        }) && name}
      </h1>
      <div>
        {/*For album in getAlbums(userId), display the title of the album. use album.id as the key*/}
        {albums.map((album) => (
          <div key={album.id}>
            <Link
              href={{
              pathname: `/albums/${album.id}`,
              query: { id: album.id }
              }}
            >
              <h2>{album.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetails;
