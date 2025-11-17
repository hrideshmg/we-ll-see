import ProfilePanel from "@/components/profile/profile-panel";
import Feed from "../../components/feed";
import NavPanel from "../../components/nav/nav-panel";

export default function DoomScroll() {
  return (
    <div className="bg-black min-h-screen flex">
      <div className="min-w-[30vw]">
        <NavPanel />
      </div>
      <div className="flex-1">
        <Feed />
      </div>
      <div className="min-w-[30vw]">
        <ProfilePanel />
      </div>
    </div>
  );
}
