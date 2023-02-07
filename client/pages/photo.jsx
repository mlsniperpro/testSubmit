//Page that displays all of the photos photos, allows users to edit the title of photo and PATCH/PUT request sent to the server
//The photos available at https://jsonplaceholder.typicode.com/photos
//The PATCH/PUT request should be sent to https://jsonplaceholder.typicode.com/photos/:id

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function photo() {
    const [photosInfo, setPhotosInfo] = useState([]);
    const queryPhotosInfo = () => {
        const url = `https://jsonplaceholder.typicode.com/photos`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setPhotosInfo(data);
        })
    }
    useEffect(() => {
        queryPhotosInfo();
    }, []);
    
  return (
    <div>
      {
        //Page that displays all of the photos photos, allows users to edit the title of photo and PATCH/PUT request sent to the server
//The photos available at https://jsonplaceholder.typicode.com/photos
//The PATCH/PUT request should be sent to https://jsonplaceholder.typicode.com/photos/:id
        photosInfo.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.title}</h2>
              <img src={item.url} alt={item.title} />
              <Link href="/photos/[id]" as={`/photos/${item.id}`}>
                <a>Photo {item.id}</a>
              </Link>
            </div>
          );
        }
        )
      }
    </div>
  )
}

export default photo
