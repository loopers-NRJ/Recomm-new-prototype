import { type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const displayName = "Nikola Tesla";
const userName = "tesla";
const image =
  "https://avatars.githubusercontent.com/u/10001?s=460&u=8b7b2c9c2e9a9b6b6b6b6b6b6b6b6b6b6b6b6b6&v=4";

const Profile: FC = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full w-full">
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>

      <h1 className="text-2xl font-bold">{displayName}</h1>
      <p className="text-gray-500">@{userName}</p>

      <div className="flex space-x-2 my-3">
        <Button>Connect</Button>
        <Button>Message</Button>
      </div>
    </main>
  );
};
export default Profile;
