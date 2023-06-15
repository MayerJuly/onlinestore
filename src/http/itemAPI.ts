import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {IType} from "../models/IType";
import {IBrand} from "../models/IBrand";
import {IItem} from "../models/IItem";

interface createProps {
    name: string
}

export const createType = async (type: createProps) => {
    try {
        const {data} = await $authHost.post('api/type', type)
        return data
    } catch (err: any) {
        console.log(err)
    }
}

export const fetchTypes = async () => {
    try {

        const {data} = await $host.get('api/type')
        return data
    } catch (err: any) {
        console.log(err)
    }
}

export const createBrand = async (brand: createProps) => {
    try {

        const {data} = await $authHost.post('api/brand', brand)
        return data
    } catch (err: any) {
        console.log(err)
    }
}

export const fetchBrands = async () => {
    try {

        const {data} = await $host.get('api/brand',)
        return data
    } catch (err: any) {
        console.log(err)
    }
}

export const createDevice = async (item: FormData) => {
    try {

        const {data} = await $authHost.post('api/device', item)
        return data
    } catch (err: any) {
        console.log(err)
    }
}

// export const fetchDevices = async () => {
//     try {
//
//         const {data} = await $host.get('api/device')
//         return data
//     } catch (err: any) {
//         console.log(err)
//     }
// }

export const fetchDevices = async (typeId: number | null | undefined, brandId: number | null | undefined, page: number, limit:number | null = 5) => {
    try {
        const {data} = await $host.get('api/device', {
            params: {
                typeId, brandId, page, limit
            }
        })
        return data

    } catch (err: any) {
        console.log(err)
    }
}


export const fetchOneItem = async (id: string) => {
    try {
        const {data} = await $host.get('api/device/' + id)
        return data
    } catch (err: any) {
        console.log(err)
    }
}