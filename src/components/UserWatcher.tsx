import { useRouter } from "next/router";
import { useEffect } from "react";

import { useStoredUser } from "stores/storedUser";
import { trpcClient } from "utils/trpc";

export const UserWatcher = () => {
  const router = useRouter();
  const storedUserState = useStoredUser();

  useEffect(() => {
    const userRef = router.query.userRef;
    if (typeof userRef === "string") {
      trpcClient.refs.getRef.query({ ref: userRef }).then((data) => {
        if (data) {
          storedUserState.setUser({ name: data.name, id: data.id });
        }
      });
    }
  });

  return <></>;
};
