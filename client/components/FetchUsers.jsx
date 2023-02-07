
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";


const FetchUsers = () => {
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

  useEffect(() => {
    queryUsers();
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        User ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4"
                      >
                        Number of Albums
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <Link
                            href={{
                                pathname: `/users/${user.id}`,
                                query: { id: user.id },
                            }}
                            >
                                <a>{user.name}</a>
                            </Link>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {albumsPerUser(user.id).then((album_length) => {
                              setTotalAlbums(album_length);
                            }) && totalAlbums}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchUsers;


