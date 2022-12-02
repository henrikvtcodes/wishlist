import { usePlausible } from "next-plausible";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStoredUser } from "stores/storedUser";
import { trpc } from "utils/trpc";

export const UserWatcher = () => {
  const router = useRouter();
  const plausible = usePlausible();
  const setUser = useStoredUser((state) => state.setUser);
  const user = useStoredUser((state) => state.user);

  const { data } = trpc.refs.getRef.useQuery({
    ref: String(router.query.userRef),
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setUser({ name: data.name, id: data.id });
    }
  }, [data, setUser]);

  useEffect(() => {
    if (user !== null) {
      plausible("RefView", { props: { ref: user.name } });
    }
  }, [user, plausible]);

  return <></>;
};
