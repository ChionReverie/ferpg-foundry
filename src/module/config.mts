const templateRoot = "systems/fireemblem/templates";

export const FERPG = {
  weaponCategory: {
    sword: "FERPG.weaponCategory.sword",
    axe: "FERPG.weaponCategory.axe",
    lance: "FERPG.weaponCategory.lance",
    bow: "FERPG.weaponCategory.bow",
    knife: "FERPG.weaponCategory.knife",
    fire: "FERPG.weaponCategory.fire",
    wind: "FERPG.weaponCategory.wind",
    thunder: "FERPG.weaponCategory.thunder",
    light: "FERPG.weaponCategory.light",
    dark: "FERPG.weaponCategory.dark",
    staff: "FERPG.weaponCategory.staff",
    beast: "FERPG.weaponCategory.beast",
    dragon: "FERPG.weaponCategory.dragon",
    other: "FERPG.weaponCategory.other",
  },

  weaponRank: {
    e: "FERPG.weaponRank.e",
    d: "FERPG.weaponRank.d",
    c: "FERPG.weaponRank.c",
    b: "FERPG.weaponRank.b",
    a: "FERPG.weaponRank.a",
    s: "FERPG.weaponRank.s",
    ss: "FERPG.weaponRank.ss",
  },

  quality: {
    armored: "FERPG.quality.armored",
    mounted: "FERPG.quality.mounted",
    flying: "FERPG.quality.flying",
    dragon: "FERPG.quality.dragon",
    beast: "FERPG.quality.beast",
    laguz: "FERPG.quality.laguz",
    beorc: "FERPG.quality.beorc",
    monster: "FERPG.quality.monster",
    undead: "FERPG.quality.undead",
  },

  templates: {
    components: {
      meter: `${templateRoot}/components/_meter.hbs`,
      item_header: `${templateRoot}/components/_item_header.hbs`,
      labeled_stat: `${templateRoot}/components/_labeled_stat.hbs`,
    },
    sheets: {
      weapon: {
        sheet: `${templateRoot}/sheets/weapon/sheet.hbs`,
        summary: `${templateRoot}/sheets/weapon/_summary.hbs`,
        navbar: `${templateRoot}/sheets/weapon/_navbar.hbs`,
        tab_description: `${templateRoot}/sheets/weapon/_tab_description.hbs`,
        tab_rules: `${templateRoot}/sheets/weapon/_tab_rules.hbs`,
      },
      unit: {
        sheet: `${templateRoot}/sheets/unit/sheet.hbs`,
        header: `${templateRoot}/sheets/unit/_header.hbs`,
        navbar: `${templateRoot}/sheets/unit/_navbar.hbs`,
        xpbar: `${templateRoot}/sheets/unit/_xpbar.hbs`,
        hpbar: `${templateRoot}/sheets/unit/_hpbar.hbs`,
        tab: {
          overview: `${templateRoot}/sheets/unit/tab/_overview.hbs`,
          advancement: `${templateRoot}/sheets/unit/tab/_advancement.hbs`,
          inventory: `${templateRoot}/sheets/unit/tab/_inventory.hbs`,
          notes: `${templateRoot}/sheets/unit/tab/_notes.hbs`,
        },
      },
    },
  },
};
