import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStoredUser } from "stores/storedUser";
import { trpc } from "utils/trpc";

export const UserWatcher = () => {
  const router = useRouter();
  const storedUserState = useStoredUser();

  const trpcUtils = trpc.useContext();

  useEffect(() => {
    const storedUser = storedUserState.user;

    if (!storedUser) {
      const userRef = router.query.userRef;
      if (typeof userRef === "string") {
        trpcUtils.refs.getRef.fetch({ ref: userRef }).then((data) => {
          storedUserState.setUser({ name: data.name, id: data.id });
        });
      }
    }
  });

  return <></>;
};
