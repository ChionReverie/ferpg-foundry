import { FireEmblemActor } from "./actor/document.mjs";
import { FireEmblemItem } from "./item/document.mjs";
import { UnitModel } from "./actor/unit/data.mjs";

import { UnitSheet } from "./actor/unit/sheet.mjs";
import { WeaponSheet } from "./item/weapon/sheet.mjs";
import { FERPG } from "./config.mjs";
import { WeaponModel } from "./item/weapon/data.mjs";
import { getTemplateUrl } from "./helper/template.mjs";

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

  const templates: any[] = [];
  readTreeToArray(FERPG.templates, templates);

  loadTemplates(templates as string[]);

  Handlebars.registerHelper("feRPG_template", getTemplateUrl);
});

function readTreeToArray(tree: object, arr: any[]) {
  Object.values(tree).forEach((branch) => {
    if (typeof branch !== "object") {
      arr.push(branch);
      return;
    }
    readTreeToArray(branch, arr);
  });
}
