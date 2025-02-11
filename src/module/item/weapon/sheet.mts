import Tagify from "@yaireo/tagify";

import { WeaponItem } from "./document.mjs";
import { FERPG } from "../../config.mjs";

export class WeaponSheet extends ItemSheet<DocumentSheetOptions<WeaponItem>> {
  tagify?: Tagify;
  skipTagifyChangeEvent = false;

  static get defaultOptions() {
    return foundry.utils.mergeObject(ItemSheet.defaultOptions, {
      classes: ["feRPG", "sheet", "weapon", "item"],
      template: FERPG.templates.sheets.weapon.sheet,
      width: 500,
      height: 400,
      tabs: [
        {
          navSelector: "nav.feRPG-sheetnav",
          initial: "description",
          contentSelector: ".feRPG-document",
        },
      ],
    });
  }

  override async getData(options: any) {
    const data = await super.getData(options);

    const item = this.item as WeaponItem;

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

  override activateListeners(html: JQuery): void {
    super.activateListeners(html);

    const selector =
      'tagify-tags.feRPG-tags[data-target="system.effective_qualities"]';
    const inputElement = html.find(selector);

    if (inputElement.length < 1) {
      console.error(`Tagify target not found by selector: ${selector}`);
    }

    inputElement.each((_i, element) => this._activateTagify(element));
  }

  _activateTagify(element: HTMLElement) {
    // TODO: Investigate - Do I need to cleanup tagify?
    const whitelist = Object.entries(CONFIG.FERPG.quality).map(
      ([id, localeString], _i, _arr) => ({
        value: id,
        name: game.i18n!.localize(localeString),
      })
    );

    const my_tagify = new Tagify(element as HTMLInputElement, {
      tagTextProp: "name",
      whitelist,
      enforceWhitelist: true,
    });

    const initialTags = (this.item as WeaponItem).system.effective_qualities;
    my_tagify.addTags(initialTags);

    /* HACK: I'm skipping the first event of every sheet load.
     * Will this cause problems later on?
     */
    this.skipTagifyChangeEvent = true;

    my_tagify.on("change", (event) => {
      this._onTagsChanged(event);
    });
  }

  _onTagsChanged(
    event: CustomEvent<Tagify.ChangeEventData<{ name: string; value: string }>>
  ) {
    if (this.skipTagifyChangeEvent) {
      this.skipTagifyChangeEvent = false;
      return;
    }

    let tagIDs = [];
    for (let tag of event.detail.tagify.value) {
      tagIDs.push(tag.value);
    }

    const target =
      event.detail.tagify.DOM.originalInput.getAttribute("data-target");
    if (!target) {
      console.error(
        "No `data-target` attribute found on DOM for tagify element",
        event.detail.tagify.DOM.originalInput
      );
      return;
    }

    this.item.update({ [target!]: tagIDs });
  }
}
