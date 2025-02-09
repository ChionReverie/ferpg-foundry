type ActorSheetContext = {}

interface UnitDataSource {
    type: 'unit';
    data: ''
}

export class UnitActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(ActorSheet.defaultOptions, {
            classes: ['feRPG', 'sheet', 'actor'],
            template: 'systems/fireemblem/templates/actor/actor-sheet.hbs',
            width: 600,
            height: 600,
        });
    }

    getData(options: any) {
        const data = super.getData(options);

        // const context = {
        //     ...data
        // }
        // const actorData = context.data;
        // context.system = actorData.system;
        
        return data;
    }
}