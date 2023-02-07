import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


function Album() {
  const router = useRouter();
  const { id } = router.query;
  const albumId = parseInt(id);
  const [albumInfo, setAlbumInfo] = useState([]);
  {
    /*Get the album photo title and url given albumId */
  }
  const queryAlbumInfo = (albumId) => {
    const url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAlbumInfo(data);
      });
  };

  useEffect(() => {
    queryAlbumInfo(albumId);
  }, []);

  return (
    <div>
      {albumInfo.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item.title}</h2>
            <img src={item.url} alt={item.title} />
          </div>
        );
      })}
    </div>
  );
}

export default Album;
