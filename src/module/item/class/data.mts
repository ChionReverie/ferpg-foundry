import { ClassItem } from "./document.mjs";

const fields = foundry.data.fields;
export type ClassSchema = ReturnType<typeof GenerateSchema>;

export class ClassModel extends foundry.abstract.TypeDataModel<
  ClassSchema,
  ClassItem
> {
  static defineSchema() {
    return GenerateSchema();
  }
}

export interface ClassData {
  /**
   * These "free keys" are not intended to be used, and only exist to
   * satisfy the compiler.
   * (Item.system is expected to implement DataModel.Any)
   * @deprecated Unknown field*/
  /*XXX*/
  [key: string]: any;

  schema: foundry.data.fields.SchemaField<ClassSchema>;

  description: string;

  combat: {
    health: number;
    strength: number;
    magic: number;
    defense: number;
    resistance: number;
    skill: number;
    speed: number;
    luck: number;
  };

  constitution: { value: number };
  move: { value: number };
  sight: { value: number };
}

function GenerateSchema() {
  return {
    description: new fields.HTMLField(),
    combat: new fields.SchemaField({
      health: new fields.NumberField({ step: 1 }),
      strength: new fields.NumberField({ step: 1 }),
      magic: new fields.NumberField({ step: 1 }),
      defense: new fields.NumberField({ step: 1 }),
      resistance: new fields.NumberField({ step: 1 }),
      skill: new fields.NumberField({ step: 1 }),
      speed: new fields.NumberField({ step: 1 }),
      luck: new fields.NumberField({ step: 1 }),
    }),
    constitution: new fields.NumberField({step: 1}),
    move: new fields.NumberField({step: 1}),
    sight: new fields.NumberField({step: 1}),
  };
}
