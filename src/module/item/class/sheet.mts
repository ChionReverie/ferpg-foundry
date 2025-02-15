import { MaybePromise, GetDataReturnType } from "fvtt-types/utils";
import { FERPG } from "../../config.mjs";
import { ClassItem } from "./document.mjs";

export class ClassSheet extends ItemSheet<DocumentSheetOptions<ClassItem>> {
  static get defaultOptions() {
    return foundry.utils.mergeObject(ItemSheet.defaultOptions, {
      classes: ["feRPG", "feRPG-class_sheet", "sheet", "item"],
      template: FERPG.templates.sheets.class.sheet,
      width: 500,
      height: 400,
    });
  }

  override async getData(
    options?: Partial<DocumentSheetOptions<ClassItem>> | undefined
  ) {
    const data = await super.getData(options);

    const item = this.item as ClassItem;

    const extendedContext = {
      ...data,
      document: this.document,
      fields: item.schema.fields,
      system: item.system,
      systemFields: item.system.schema.fields,
      enrichedContent: {
        description: await TextEditor.enrichHTML(item.system.description ?? ""),
      },
    };

    return extendedContext;
  }
}
