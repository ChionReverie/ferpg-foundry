import { FireEmblemActor } from "../document.mjs";

const fields = foundry.data.fields;

export type UnitSchema = ReturnType<typeof GenerateSchema>;

export class UnitModel extends foundry.abstract.TypeDataModel<
  UnitSchema,
  FireEmblemActor
> {
  static defineSchema() {
    return GenerateSchema();
  }
  // TODO: Remove the coerce ! operators
  get dead() {
    return this.combat.health.value! <= this.combat.health.min!;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this.combat.health.value = Math.min(
      this.combat.health.value!,
      this.combat.health.max!
    );
  }
}

export interface UnitData {
  /**
   * These "free keys" are not intended to be used, and only exist to
   * satisfy the compiler.
   * (Actor.system is expected to implement DataModel.Any)
   * @deprecated Unknown field*/
  /*XXX*/
  [key: string]: any;

  schema: foundry.data.fields.SchemaField<UnitSchema>;

  combat: {
    health: CombatStat | MeterStat;
    strength: CombatStat;
    magic: CombatStat;
    defense: CombatStat;
    resistane: CombatStat;
    skill: CombatStat;
    speed: CombatStat;
    luck: CombatStat;
  };

  exp: MeterStat;

  constitution: { value: number };
  move: { value: number };
  sight: { value: number };
}

interface CombatStat {
  base: number;
  total: number;
  temp: number;
  growth: number;
}
interface MeterStat {
  value: number;
  min: number;
  max: number;
  meter: number;
}

function GenerateSchema() {
  const combat = new fields.SchemaField({
    health: _MeterCombatStatField(),
    strength: _CombatStatField(),
    magic: _CombatStatField(),
    defense: _CombatStatField(),
    resistance: _CombatStatField(),
    skill: _CombatStatField(),
    speed: _CombatStatField(),
    luck: _CombatStatField(),
  });

  const exp = new fields.SchemaField({
    value: new fields.NumberField({ initial: 0, step: 1 }),
    min: new fields.NumberField({ initial: 0, step: 1 }),
    max: new fields.NumberField({ initial: 100, step: 1 }),
  });

  const move = new fields.SchemaField({
    value: new fields.NumberField({ initial: 5, step: 1 }),
  });
  const constitution = new fields.SchemaField({
    value: new fields.NumberField({ initial: 8, step: 1 }),
  });
  const sight = new fields.SchemaField({
    value: new fields.NumberField({ initial: 4, step: 1 }),
  });

  return { combat, exp, move, constitution, sight };
}

function _CombatStatField() {
  return new fields.SchemaField({
    base: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    total: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    temp: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    growth: new fields.NumberField({ required: true, initial: 50, step: 1 }),
  });
}

function _MeterCombatStatField() {
  return new fields.SchemaField({
    base: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    total: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    temp: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    growth: new fields.NumberField({ required: true, initial: 50, step: 1 }),
    value: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    min: new fields.NumberField({ required: true, initial: 0, step: 1 }),
    max: new fields.NumberField({ required: true, initial: 0, step: 1 }),
  });
}
