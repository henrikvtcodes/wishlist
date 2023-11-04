// @ts-check
import { FastestNodeClient, fetchBeacon } from "drand-client";

const drandNodeClient = new FastestNodeClient(
  [
    "https://api.drand.sh",
    "https://drand.cloudflare.com",
    // ...
  ],
  {
    disableBeaconVerification: false, // `true` disables checking of signatures on beacons - faster but insecure!!!
    noCache: true, // `true` disables caching when retrieving beacons for some providers
  },
);

drandNodeClient.start();

const drandBeacon = await fetchBeacon(drandNodeClient);

const drandRound = drandBeacon.round;
// console.log({ drandRound });
process.env.NEXT_PUBLIC_CUID_SEED = String(drandRound);

drandNodeClient.stop();
