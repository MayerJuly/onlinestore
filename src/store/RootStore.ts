import UserStore from "./UserStore";
import ItemStore from "./ItemStore";


export class RootStore {
    item: ItemStore;
    user: UserStore;

    constructor() {
        this.item = new ItemStore();
        this.user = new UserStore(); // Pass `this` into stores for easy communication
    }
}