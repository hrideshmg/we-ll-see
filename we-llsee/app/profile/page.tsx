'use client'
import { useEffect, useState} from 'react';

function getAccessToken() {
  if (typeof window !== 'undefined') {
   return window.localStorage.getItem('access_token') ;
  } 
  return null;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();

    fetch('http://127.0.0.1:8000/users/auth/me/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!userData && !error) {
    return <div className="text-white">Loading...</div>;
  }
 
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  console.log(userData);
  const {username, name, bio, karma} = userData;

  
  return (
    <div className="text-white flex justify-center px-4">
      <div className="max-w-4xl w-full">

        <div className="flex gap-10 mt-10 flex-wrap">
          
          <div>
            <div className="w-32 h-32 rounded-full bg-neutral-700"></div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-2xl font-semibold">{username}</h2>

              <button className="px-4 py-1 bg-neutral-800 rounded-lg text-sm">
                Edit Profile
              </button>

              <button className="px-4 py-1 bg-neutral-800 rounded-lg text-sm">
                Share Profile
              </button>
            </div>

            <div className="flex gap-6 text-sm">
              <span>
                <strong>42</strong> posts
              </span>
              <span>
                <strong>1,240</strong> followers
              </span>
              <span>
                <strong>530</strong> following
              </span>
            </div>

            <div className="text-sm">
              <p className="font-semibold">{name}</p>
              <p>Builder • amFOSS • Tech + Music</p>
              <p>Karma points : {karma}</p>
              <p className="text-blue-400">{bio}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 mb-6"></div>

        <div className="flex justify-center gap-10 text-sm mb-6">
          <button className="flex items-center gap-2 font-semibold border-t border-white py-2">
            POSTS
          </button>
          <button className="flex items-center gap-2 text-neutral-500">
            SAVED
          </button>
          <button className="flex items-center gap-2 text-neutral-500">
            TAGGED
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="w-full aspect-square bg-neutral-700 flex items-center justify-center"
            >
              img {i}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
