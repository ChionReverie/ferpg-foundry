import { FireEmblemItem } from "../document.mjs";

const fields = foundry.data.fields;
export type WeaponSchema = ReturnType<typeof GenerateSchema>;

export class WeaponModel extends foundry.abstract.TypeDataModel<
  WeaponSchema,
  FireEmblemItem
> {
  static defineSchema() {
    return GenerateSchema();
  }
}

export interface WeaponData {
  /**
   * These "free keys" are not intended to be used, and only exist to
   * satisfy the compiler.
   * (Item.system is expected to implement DataModel.Any)
   * @deprecated Unknown field*/
  /*XXX*/
  [key: string]: any;

  schema: foundry.data.fields.SchemaField<WeaponSchema>;

  category: string;
  rank: string;
  uses: {
    remaining: number;
    max: number;
  };
  value: number;
  range: string;
  might: number;
  weight: number;
  hit: number;
  crit: number;
  wexp: number;
  effective_qualities: string[];
  effect_text: string;

  xp: {
    current: number;
    max: number;
  };

  description: string;
}

function GenerateSchema() {
  const schema = {
    category: new fields.StringField({
      choices: CONFIG.FERPG.weaponCategory,
    }),
    rank: new fields.StringField({
      choices: CONFIG.FERPG.weaponRank,
    }),
    uses: new fields.SchemaField({
      remaining: new fields.NumberField({ integer: true }),
      max: new fields.NumberField({ integer: true }),
    }),
    value: new fields.NumberField({ integer: true }),

    range: new fields.StringField(),
    might: new fields.NumberField({ integer: true }),
    weight: new fields.NumberField({ integer: true }),
    hit: new fields.NumberField({ integer: true }),
    crit: new fields.NumberField({ integer: true }),

    wexp: new fields.NumberField({ integer: true }),

    effective_qualities: new fields.ArrayField(
      new fields.StringField({
        required: true,
        initial: undefined,
        nullable: false,
        choices: Object.keys(CONFIG.FERPG.quality),
      })
    ),

    effects_text: new fields.StringField(),

    description: new fields.HTMLField(),
  };

  return schema;
}
