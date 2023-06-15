import {makeAutoObservable} from "mobx";
import {IUser} from "../models/IUser";


export interface IBasket {
    id: number | null,
    userId: number | null,
}

export interface IUserStore {
    _isAuth: boolean,
    _user?: IUser
    _basket?: IBasket

}

export default class UserStore implements IUserStore{
    public _isAuth: boolean;
    public _user: IUser;
    public _basket: IBasket;

    constructor() {
        this._isAuth = false
        this._user = {}
        this._basket = {id:null, userId:null}
        makeAutoObservable(this)
    }

    setIsAuth(bool:boolean) {
        this._isAuth = bool
    }
    setUser(user:IUser) {
        this._user = user
    }
    setBasket(basket:IBasket) {
        this._basket = basket
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get basket() {
        return this._basket
    }
}