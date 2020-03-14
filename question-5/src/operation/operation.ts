export class Operation {
    public actions: { move: number, insert: string }[];

    constructor(actions: any) {
        this.actions = actions;
    }

    public static combine(operation1: Operation, operation2: Operation): Operation {
        const actions = operation2.actions.map(x => Object.assign({}, x));
        const clonedOperation2 = new Operation(actions);
        Operation.transform(operation1, clonedOperation2);
        return new Operation(operation1.actions.concat(clonedOperation2.actions));
    }

    public static transform(operation1: Operation, operation2: Operation) {
        let currentMove = 0;
        operation1.actions.forEach(action => {
            Operation.checkActionIsValid(action);
            switch (Object.keys(action)[0]) {
                case 'move':
                    currentMove = action.move;
                    break;
                case 'insert':
                    Operation.update(operation2, currentMove, action.insert);
                    break;
                default:
                    break;
            }
        });
    }

    public static update(operation: Operation, previousMove: number, previousInsert: string) {
        if (operation.actions.length > 0) {
            operation.actions.forEach(action => {
                Operation.checkActionIsValid(action);
                switch (Object.keys(action)[0]) {
                    case 'move':
                        if (action.move > previousMove)
                            action.move -= previousMove;
                        else {
                            action.move = action.move - previousInsert.length - previousMove;
                        }
                        break;
                    case 'insert':
                    default:
                        break;
                }
            });
        }
    }

    public static checkActionIsValid(action: { move: number, insert: string }) {
        if (Object.keys(action).length !== 1) {
            throw new Error('Action should be either move or insert');
        }
    }

    public combine(operation: Operation): Operation {
        Operation.transform(this, operation);
        return operation;
    }

    public apply(baseString: string): string {
        let cursor = 0;
        this.actions.forEach(action => {
            Operation.checkActionIsValid(action);
            switch (Object.keys(action)[0]) {
                case 'move':
                    cursor += action.move;
                    break;
                case 'insert':
                    if (cursor < 0 || cursor > baseString.length) {
                        throw new Error('Cursor is out of bounds');
                    }
                    baseString = `${baseString.slice(0, cursor)}${action.insert}${baseString.slice(cursor)}`;
                    cursor += action.insert.length;
                    break;
                default:
                    break;
            }
        });
        return baseString;
    }
}