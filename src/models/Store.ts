import { observable, action, computed, autorun } from 'mobx';

export class Store {
  private static _instance: Store | undefined = undefined;
  public static get instance() {
    if (Store._instance === undefined) { Store._instance = new Store(); }
    return Store._instance;
  }

  @observable.struct private _actionQueue: Array<() => void> = [];
  @computed private get actionQueue() { return this._actionQueue; }
  private set actionQueue(actionQueue: Array<() => void>) { this._actionQueue = actionQueue; }

  @observable private _drawerIsOpen = false;
  @computed public get drawerIsOpen() { return this._drawerIsOpen; }

  public constructor() {
    // run scheduled actions in every other tick
    autorun(
      () => {
        for (const actionItem of this.actionQueue) {
          actionItem();
        }
        this.actionQueue = [];
      }
    );
  }

  @action public toogleDrawer = () => {
    this.actionQueue.push(action(() => this._drawerIsOpen = !this._drawerIsOpen));
  }
}

export const store = Store.instance;
export default Store;
