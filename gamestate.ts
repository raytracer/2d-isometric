import { Building } from "./building";

export interface GameState {
    buildings: Array<Building>
}

export function updateState(state: GameState, timeDelta: number) {
    return state;
}