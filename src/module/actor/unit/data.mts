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
    health: HPStat;
    strength: CombatStat;
    magic: CombatStat;
    defense: CombatStat;
    resistane: CombatStat;
    skill: CombatStat;
    speed: CombatStat;
    luck: CombatStat;
  };
}

interface CombatStat {
  base: number;
  total: number;
  temp: number;
  growth: number;
}
interface HPStat extends CombatStat {
  value: number;
  min: number;
  max: number;
}

function GenerateSchema() {
  const combat = new fields.SchemaField({
    health: _hpStatField(),
    strength: _combatStatField(),
    magic: _combatStatField(),
    defense: _combatStatField(),
    resistance: _combatStatField(),
    skill: _combatStatField(),
    speed: _combatStatField(),
    luck: _combatStatField(),
  });

  return { combat };
}

function _combatStatField() {
  return new fields.SchemaField({
    base: new fields.NumberField({ required: true, initial: 0 }),
    total: new fields.NumberField({ required: true, initial: 0 }),
    temp: new fields.NumberField({ required: true, initial: 0 }),
    growth: new fields.NumberField({ required: true, initial: 50 }),
  });
}

function _hpStatField() {
  return new fields.SchemaField({
    value: new fields.NumberField({ required: true, initial: 0 }),
    min: new fields.NumberField({ required: true, initial: 0 }),
    max: new fields.NumberField({ required: true, initial: 0 }),

    base: new fields.NumberField({ required: true, initial: 0 }),
    total: new fields.NumberField({ required: true, initial: 0 }),
    temp: new fields.NumberField({ required: true, initial: 0 }),
    growth: new fields.NumberField({ required: true, initial: 50 }),
  });
}
