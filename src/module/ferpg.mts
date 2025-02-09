import { FireEmblemActor } from "./actor/document.mjs";
import { FireEmblemItem } from "./item/document.mjs";
import { UnitModel } from "./actor/unit/data.mjs";

import { UnitActorSheet } from "./actor/unit/sheet.mjs";
import { WeaponItemSheet } from "./item/weapon/sheet.mjs";
import { FERPG } from "./config.mjs";
import { WeaponModel } from "./item/weapon/data.mjs";

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
  Actors.registerSheet("fireemblem", UnitActorSheet, {
    label: "FERPG.sheet.label.unit",
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("fireemblem", WeaponItemSheet, {
    label: "FERPG.sheet.label.weapon",
  });

  const templatePaths = [
    "systems/fireemblem/templates/parts/_item_header.hbs",
    "systems/fireemblem/templates/item/weapon/_summary.hbs",
    "systems/fireemblem/templates/item/weapon/_tablist.hbs",
    "systems/fireemblem/templates/item/weapon/_tab_description.hbs",
    "systems/fireemblem/templates/item/weapon/_tab_rules.hbs",
  ];
  loadTemplates(templatePaths);
});
