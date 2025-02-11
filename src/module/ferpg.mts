import { FireEmblemActor } from "./actor/document.mjs";
import { FireEmblemItem } from "./item/document.mjs";
import { UnitModel } from "./actor/unit/data.mjs";

import { UnitSheet } from "./actor/unit/sheet.mjs";
import { WeaponSheet } from "./item/weapon/sheet.mjs";
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
  Actors.registerSheet("fireemblem", UnitSheet, {
    label: "FERPG.sheet.label.unit",
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("fireemblem", WeaponSheet, {
    label: "FERPG.sheet.label.weapon",
  });

  const templatePaths = [
    "systems/fireemblem/templates/components/_meter.hbs",
    "systems/fireemblem/templates/components/_item_header.hbs",
    "systems/fireemblem/templates/components/_labeled_stat.hbs",
    "systems/fireemblem/templates/actor/unit/_header.hbs",
    "systems/fireemblem/templates/actor/unit/_xpbar.hbs",
    "systems/fireemblem/templates/actor/unit/_hpbar.hbs",
    "systems/fireemblem/templates/item/weapon/_summary.hbs",
    "systems/fireemblem/templates/item/weapon/_tablist.hbs",
    "systems/fireemblem/templates/item/weapon/_tab_description.hbs",
    "systems/fireemblem/templates/item/weapon/_tab_rules.hbs",
  ];
  loadTemplates(templatePaths);
});
