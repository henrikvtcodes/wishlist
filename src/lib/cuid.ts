import { init } from "@paralleldrive/cuid2";

import { env } from "~/env.mjs";

const cuidNormal = init({});

const cuidSlug = init({
  length: 8,
});

const cuid = () => cuidNormal();

cuid.slug = cuidSlug;

Object.seal(cuid);

export { cuid };
