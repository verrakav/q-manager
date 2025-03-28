import { currentUser } from "@clerk/nextjs/server";
import Favourites from "./Favourites";
import SectionHeader from "@/Components/SectionHeader";
export default async function UserSettingsPage() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  const username = user?.firstName;
  return (
    // page container
    <div className="m-4">
      {/* header section */}
      <SectionHeader>{`${username}\'s Dashboard`}</SectionHeader>
      <span className="text-center">Hello {username} You can manage your favourites here</span>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex flex-col gap-2">
          <SectionHeader>Manage Favourites</SectionHeader>
          <Favourites />
        </div>
        {/* content section */}
        <div className="flex flex-col gap-2">
          <SectionHeader>Manage Notifications</SectionHeader>
          <span>notification features will be here</span>
          <span>user data will be here?</span>
        </div>
      </div>
    </div>
  );
}
