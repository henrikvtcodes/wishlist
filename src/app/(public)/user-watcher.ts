"use client";

// import { usePlausible } from "next-plausible";
import { loglib } from "@loglib/tracker";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useStoredUser } from "~/stores/storedUser";
import { api } from "~/trpc/react";

export function UserWatcher() {
  const searchParams = useSearchParams();
  // const plausible = usePlausible();
  const setUser = useStoredUser((state) => state.setUser);
  const user = useStoredUser((state) => state.user);

  const { data } = api.refs.getRef.useQuery(
    {
      ref: String(searchParams.get("ref")),
    },
    { enabled: String(searchParams.get("ref")) !== "null" },
  );

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setUser({ name: data.name, id: data.id });
    }
  }, [data, setUser]);

  useEffect(() => {
    if (user !== null) {
      loglib.identify({ id: user.id, name: user.name });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user !== null) {
  //     plausible("RefView", { props: { ref: user.name } });
  //   }
  // }, [user, plausible]);

  return null;
}
