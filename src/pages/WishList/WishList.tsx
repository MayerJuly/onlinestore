import "./wishList.scss"
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import Navbar from "../../components/Navbar/Navbar";
import {Box, Button, Container, Flex, Spinner, Text} from "@chakra-ui/react";
import {useParams} from "react-router-dom";
import {fetchOneItem} from "../../http/itemAPI";
import {Context} from "../../index";
import {deleteItemFromBasket, getBasketItems} from "../../http/userAPI";
import {ItemProps} from "../ItemPage/ItemPage";
import {SERVER_URL} from "../../consts";
import CreateOrder from "../../components/modals/CreateOrder/CreateOrder";


const WishList = observer(() => {


    const [items, setItems] = useState<ItemProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSent, setIsSent] = useState<boolean>(true);
    const {user} = useContext(Context);
    let acc = 0;
    useEffect(() => {
        user.basket.id && getBasketItems(user.basket.id).then(data => setItems(data)).finally(() => setIsLoading(false))
    }, [user, isSent])

    const handleDelete = (itemId:number) => {
        setIsLoading(true)
        user.basket.id && deleteItemFromBasket(user.basket.id, itemId).then(data => setItems(data)).finally(() => setIsLoading(false))
    }




    return (
        <>
            <Navbar/>
            {items.length === 0 && <Text mt={4} textAlign={'center'} fontSize={'2xl'}>Корзина пуста</Text>}
            {isLoading ?  <Spinner size={'2xl'}/>
            : <Container py={4} maxW={'7xl'}>
                    <Flex flexDirection={'column'} border={'1px solid gray'} >

                        {items.map((item) =>
                        {
                            acc += item.price
                            return (

                                <Flex key={item.id} borderBottom={'1px solid gray'} alignItems={'center'}  p={4}>
                                    <img className={'wishList__img'} src={SERVER_URL + item.img} alt={'item'} />
                                    <Text fontSize={'xl'} className={'wishList__name'}>
                                        {item.name}
                                    </Text>
                                    <Text fontSize={'2xl'} className={'wishList__price'}>
                                        {item.price} ₽
                                    </Text>
                                    <Button variant={'outline'} onClick={() => {
                                        handleDelete(item.id)
                                    }}  colorScheme={'red'}>
                                        Удалить
                                    </Button>
                                </Flex>
                            )

                        })}


                    </Flex>
                    <Flex mt={'40px'} w={'full'} justifyContent={'flex-end'} alignItems={'center'}>
                        <Text fontSize={'2xl'} fontWeight={'500'} marginRight={'20px'}>Стоимость: {acc} ₽</Text>
                            <CreateOrder isSent={isSent} setIsSent={setIsSent} summary={acc}/>
                    </Flex>
                </Container>}


        </>
    );
})

export default WishList;