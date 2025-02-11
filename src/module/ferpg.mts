import { FireEmblemActor } from "./actor/document.mjs";
import { FireEmblemItem } from "./item/document.mjs";
import { UnitModel } from "./actor/unit/data.mjs";

import { UnitSheet } from "./actor/unit/sheet.mjs";
import { WeaponSheet } from "./item/weapon/sheet.mjs";
import { FERPG } from "./config.mjs";
import { WeaponModel } from "./item/weapon/data.mjs";
import { readTablePaths } from "./util.mjs";

Hooks.once("init", () => {
  CONFIG.FERPG = FERPG;
  CONFIG.Actor.documentClass = FireEmblemActor;
  CONFIG.Item.documentClass = FireEmblemItem;

  CONFIG.Actor.dataModels = {
    unit: UnitModel,
  };
  CONFIG.Item.dataModels = {
    weapon: WeaponModel,
  };

  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("fireemblem", UnitSheet, {
    label: "FERPG.sheet.label.unit",
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("fireemblem", WeaponSheet, {
    label: "FERPG.sheet.label.weapon",
  });

  const templates: { [key: string]: string } = {};
  for (const next of readTablePaths("feRPG:", FERPG.templates)) {
    templates[next.key] = next.value;
  }
  loadTemplates(templates);
});
