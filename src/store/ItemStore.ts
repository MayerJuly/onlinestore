import {makeAutoObservable} from "mobx";
import {IItem} from "../models/IItem";
import {IType} from "../models/IType";
import {IBrand} from "../models/IBrand";

export interface IItemStore {
    _types?: IType[];
    _brands?: IBrand[];
    _items?: IItem[];
    _selectedType?: IType | null;
    _selectedBrand?: IBrand | null;
    _page: number;
    _totalCount: number;
    _limit: number;
}

export default class ItemStore implements IItemStore{
    public _types: IType[];
    public _brands: IBrand[];
    public _items: IItem[];
    public _selectedType: IType | null;
    public _selectedBrand: IBrand | null;
    public _page
    public _totalCount
    public _limit
    constructor() {
        this._types = [
            // {id: 3451, name: "Смартфоны"},
            // {id: 263, name: "Умные часы"},
            // {id: 34673, name: "Ноутбуки"},
            // {id: 4754, name: "Телевизоры"}
        ]
        this._brands = [
            // {id: 1412, name: "Samsung"},
            // {id: 212312, name: "Samsung"},
            // {id: 3412, name: "Samsung"},
            // {id: 412314, name: "Samsung"},
            // {id: 2123124, name: "Apple"}
        ]
        this._items = [
            // {id: 861, name: "Samsung", price:25000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 25, name: "Xiaomi", price:24000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 83, name: "LG", price:22000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 454, name: "Iphone", price:52000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 533, name: "Redmi", price:12000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 622, name: "Redmi", price:12000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 713, name: "Redmi", price:12000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
            // {id: 412, name: "Redmi", price:12000, rating:5, img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"},
        ]

        this._selectedType = null
        this._selectedBrand = null
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }
    setTypes(types:IType[]) {
        this._types = types;
    }
    setBrands(brands:IBrand[]) {
        this._brands = brands;
    }
    setItems(items:IItem[]) {
        this._items = items;
    }

    setSelectedType(type:IType | null) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(type:IBrand | null) {
        this.setPage(1)
        this._selectedBrand = type
    }
    setPage(page:number) {
        this._page = page
    }

    setTotalCount(count:number) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get items() {
        return this._items
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }


    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}