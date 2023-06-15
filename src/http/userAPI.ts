import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"



export const registration = async ( name:string, lastName:string, email:string, password:string) => {

    try {
        const {data} = await $host.post('api/user/register', {name, lastName, email, password})

        await localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (err:any) {
        console.log(err.response.data.message)
    }

}

export const login = async (email:string, password:string) => {
    try {
        const {data} = await $host.post('/api/user/login', {email, password});
        await localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (err:any) {
        console.log(err.response.data.message)
    }




}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/check' )
        await localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (err:any) {
        localStorage.removeItem('token')
        console.log(err.response.data.message)
    }

}


export const getBasket = async () => {
    try {
        const {data} = await $authHost.get('api/basket' )
        return data;
    } catch (err:any) {
        console.log(err.response.data.message)
    }

}
export const getBasketItems = async (basketId:number) => {
    try {
        const {data} = await $authHost.post('api/basket', {basketId} )
        return data;
    } catch (err:any) {
        console.log(err.response.data.message)
    }
}

export const sendOrder = async (name:string, lastName:string, email:string, phone:string ) => {
    try {
        const {data} = await $authHost.post('api/basket/order', {name, lastName, email, phone} )
        return data;
    } catch (err:any) {
        console.log(err.response.data.message)
    }

}

export const deleteItemFromBasket = async (basketId:number, itemId:number) => {
    try {
        const {data} = await $authHost.post('api/basket/delete', {basketId, itemId} )
        console.log('delete and update items:', data)
        return data;
    } catch (err:any) {
        console.log(err.response.data.message)
    }

}

export const addItemToBasket = async (basketId:number, itemId:number) => {
    try {
        const {data} = await $authHost.post('api/basket/add', {basketId, itemId})
        return data[1];
    } catch (err:any) {
        console.log(err.response.data.message)
    }

}

