import { FERPG } from "./config.mjs";
import { FireEmblemActor } from "./actor/document.mjs";
import { FireEmblemItem } from "./item/document.mjs";

declare global {
  interface CONFIG {
    FERPG: typeof FERPG;
  }

  interface DocumentClassConfig {
    Actor: typeof FireEmblemActor;
    Item: typeof FireEmblemItem;
  }
}
