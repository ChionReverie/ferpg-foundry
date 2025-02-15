import { FERPG } from "../../config.mjs";
import { findWithinNode } from "../../util.mjs";
import { UnitActor } from "./document.mjs";

export class UnitSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(ActorSheet.defaultOptions, {
      classes: ["feRPG", "feRPG-unit_sheet", "sheet"],
      template: FERPG.templates.sheets.unit.sheet,
      width: 500,
      height: 600,
      tabs: [
        {
          navSelector: "nav.feRPG-sheetnav",
          initial: "overview",
          contentSelector: ".feRPG-document",
        },
      ],
    });
  }

  override async getData(options: any) {
    const data = await super.getData(options);

    const actor = this.actor as UnitActor;

    const extendedContext = {
      ...data,
      document: this.document,
      fields: actor.schema.fields,
      system: actor.system,
      systemFields: actor.system.schema.fields,
    };

    console.log(extendedContext);

    return extendedContext;
  }

  activateListeners(html: JQuery): void {
    const nav = findWithinNode(html, "nav.feRPG-sheetnav");
    const title = findWithinNode(nav, ".feRPG-sheetnav-tab_name");

    const activeTab = findWithinNode(nav, "a[data-tab].active");
    const key = activeTab.attr("data-tooltip");
    const localized = game.i18n!.localize(key!);
    title.text(localized);

    nav.on("click", (event) => {
      const activeTab = findWithinNode(nav, "a[data-tab].active");
      const key = activeTab.attr("data-tooltip");
      const localized = game.i18n!.localize(key!);
      title.text(localized);
    });
  }
}

