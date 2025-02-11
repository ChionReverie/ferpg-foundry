import { UnitActor } from "./document.mjs";

export class UnitSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(ActorSheet.defaultOptions, {
      classes: ["feRPG", "sheet", "unit"],
      template: "systems/fireemblem/templates/actor/unit/sheet.hbs",
      width: 500,
      height: 600,
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

    return extendedContext;
  }
}
