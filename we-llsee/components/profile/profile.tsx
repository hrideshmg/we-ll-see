"use client";

export default function ProfilePage() {
  return (
    <div className="text-white flex justify-center px-4">
      <div className="max-w-4xl w-full">

        {/* Top Section */}
        <div className="flex gap-10 mt-10 flex-wrap">
          
          {/* Profile Picture */}
          <div>
            <div className="w-32 h-32 rounded-full bg-neutral-700"></div>
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-center gap-4">
            {/* Username + Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <h2 className="text-2xl font-semibold">amansxcalibur</h2>

              <button className="px-4 py-1 bg-neutral-800 rounded-lg text-sm">
                Edit Profile
              </button>

              <button className="px-4 py-1 bg-neutral-800 rounded-lg text-sm">
                Share Profile
              </button>
            </div>

            {/* Stats */}
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

            {/* Bio */}
            <div className="text-sm">
              <p className="font-semibold">Aman V Shafeeq</p>
              <p>Builder • amFOSS • Tech + Music</p>
              <p className="text-blue-400">aman.dev</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 mt-10 mb-6"></div>

        {/* Tabs (just visual like IG) */}
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

        {/* Grid of Posts */}
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
