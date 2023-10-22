import { useStoredUser } from "stores/storedUser";

export const HeaderBarUser = () => {
  const userName = useStoredUser((state) => state.user?.name);

  return (
    <span className="text-base font-medium text-gray-600 ">
      Hi
      <span className="font-semibold">
        {userName ? ` ${userName}` : " there"}
      </span>
    </span>
  );
};
