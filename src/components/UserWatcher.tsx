import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStoredUser } from "stores/storedUser";
import { trpc } from "utils/trpc";

export const UserWatcher = () => {
  const router = useRouter();
  const setUser = useStoredUser((state) => state.setUser);

  const { data } = trpc.refs.getRef.useQuery({
    ref: String(router.query.userRef),
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setUser({ name: data.name, id: data.id });
    }
  }, [data, setUser]);

  return <></>;
};
