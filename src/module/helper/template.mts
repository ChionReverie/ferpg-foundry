import { FERPG } from "../config.mjs";

export function getTemplateUrl(uri: string): string {
  const index = uri.indexOf(":") + 1;
  const expectedScheme = "feRPG:";
  const scheme = uri.slice(0, index);
  if (scheme !== expectedScheme) {
    console.error(index, expectedScheme, scheme);
    throw new Error(
      `URI ${uri} does not start with a supported scheme. (Expected scheme: ${expectedScheme})`
    );
  }
  const slugs = uri.slice(index).split("/");
  let nextBranch = FERPG.templates as any;
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    if (!(slug in nextBranch)) {
      const path = slugs.slice(0, i + 1).join("/");
      throw new Error(`Path ${path} not found in templates list.`);
    }
    nextBranch = nextBranch[slug];
  }

  if (typeof nextBranch !== "string") {
    const path = slugs.join("/");
    throw new Error(
      `Object at path ${path} in templates list is not a string.`
    );
  }

  return nextBranch;
};
