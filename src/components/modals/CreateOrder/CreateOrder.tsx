import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, FormControl, FormLabel, Input, Select, Flex, Text, useToast, Textarea,
} from '@chakra-ui/react'
import {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../../http/itemAPI";
import {observer} from "mobx-react-lite";
import MaskedInput from 'react-text-mask'
import "./createOrder.scss"
import {sendOrder} from "../../../http/userAPI";

interface infoProps {
    title?: string,
    description?: string,
    id: number,
}

interface CreateModalProps {
    summary?: number,
    isSent: boolean,
    setIsSent: Dispatch<SetStateAction<boolean>>,
}

const CreateItem = observer(({summary, isSent, setIsSent}:CreateModalProps) => {

    const {user} = useContext(Context)

    const [name, setName] = useState<string>(user.user.name || '')
    const [lastName, setLastName] = useState<string>(user.user.lastName || '')
    const [email, setEmail] = useState<string>(user.user.email || '')
    const [phone, setPhone] = useState<string>('')


    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast();

    const sendData = () => {
        sendOrder(name, lastName, email, phone).then(response => {
            if(response) {
                onClose();
                toast({
                    title: 'Заказ успешно оформлен',
                    description: 'Мы свяжемся с вами для уточнения деталей в ближайшее время.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                setIsSent(!isSent);

            } else {
                toast({
                    title: 'Не удалось оформить заказ',
                    description: 'Пожалуйста, обновите страницу и попробуйте заново',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        })



    }

    const addOrder = () => {
        if(name && lastName && email && phone && phone.indexOf('_') === -1) {

            sendData();
        } else {
            toast({
                title: 'Не удалось оформить заказ',
                description: 'Заполните все необходимые данные',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

    }



    return (
        <>
            <Button onClick={onOpen}
                    colorScheme={'green'}
                    w={'100%'}
                    py={'7px'}
                    maxW={'180px'}
                    size={'md'}
                    textTransform={'uppercase'}

            >Оформить заказ</Button>

            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Оформление заказа</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={4}>
                        <FormControl mb={3}>
                            <FormLabel>Имя</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)}
                                   placeholder='Введите имя'/>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Фамилия</FormLabel>
                            <Input value={lastName} onChange={(e) => setLastName(e.target.value)}
                                   placeholder='Введите фамилию'/>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Адрес эл. почты</FormLabel>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)}
                                   placeholder='Введите адрес эл. почты'/>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Номер телефона</FormLabel>
                            <MaskedInput guide={true} className={'phoneInput'} mask={['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]} value={phone} onChange={(e) => setPhone(e.target.value)}  type="text" placeholder={"Введите номер телефона"}/>
                        </FormControl>
                        <Text  fontSize={'xl'} fontWeight={'500'} textAlign={'right'} >Сумма заказа: {summary} рублей</Text>


                    </ModalBody>

                    <ModalFooter >
                        <Button colorScheme='green'  mr={3} onClick={addOrder}>
                            Оформить заказ
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
});

export default CreateItem;