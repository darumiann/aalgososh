import { ElementStates } from "../types/element-states";

export interface INewStack {
    letter: string;
    state: ElementStates;
}

export class Stack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    getByIndex(index: number, item: T) {
        this.container[index] = item;
    }

    clear = (): void => {
        this.container = [];
    };

    get items() {
        return [...this.container];
    }

    get size() {
        return this.container.length;
    }
}

export const stack = new Stack<INewStack>();