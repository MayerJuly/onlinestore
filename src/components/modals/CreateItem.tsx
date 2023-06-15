import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, FormControl, FormLabel, Input, Select, Flex, Text, useToast, Textarea,
} from '@chakra-ui/react'
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";

interface infoProps {
    title?: string,
    description?: string,
    id: number,
}

const CreateItem = observer(() => {

    const {item} = useContext(Context)

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [info, setInfo] = useState<Array<infoProps>>([])
    const [file, setFile] = useState<any>(null)
    const [desc, setDesc] = useState<string>('')

    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast();

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
        fetchBrands().then(data => item.setBrands(data))
        fetchDevices(null, null, 1, null).then(data => item.setItems(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id: number) => {
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key: string, value: string, id: number) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const selectFile = (e: any) => {

        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.log(file)
            alert('Неподдерживаемый формат изображения')
            return
        }
        setFile(e.target.files[0])

    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', `${item.selectedBrand?.id}`)
        formData.append('typeId', `${item.selectedType?.id}`)
        formData.append('info', JSON.stringify(info))
        formData.append('desc', desc)
        if(name && price && info) {
            createDevice(formData).then(data => {
                if(data){
                    onClose()
                    toast({
                        title: 'Товар успешно добавлен.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Не удалось добавить товар.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            })
        } else {
            toast({
                title: 'Заполните все поля',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

    }

    return (
        <>
            <Button onClick={onOpen}
                    rounded={'none'}
                    w={'100%'}
                    maxW={'650px'}
                    size={'lg'}
                    py={'7'}
                    bg={'gray.900'}
                    color={'white'}
                    textTransform={'uppercase'}
                    _hover={{
                        transform: 'translateY(2px)',
                        boxShadow: 'lg',
                    }}
            >Добавить товар</Button>

            <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить товар</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <Select onChange={(e) => {
                                item.brands.map(brand => {
                                    if (String(brand.id) === e.target.value) {
                                        item.setSelectedBrand(brand)

                                    }
                                })
                                console.log(item.selectedBrand?.id)
                            }}
                                    mb={4}
                                    placeholder='Выберите бренд'>
                                {item.brands.map(brand =>
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Select onChange={(e) => {
                                item.types.map(type => {
                                    if (String(type.id) === e.target.value) {
                                        item.setSelectedType(type)

                                    }
                                })
                            }}

                                    mb={3}
                                    placeholder='Выберите тип товара'>
                                {item.types.map(type =>
                                    <option onClick={() => item.setSelectedType(type)} key={type.id}
                                            value={type.id}>{type.name}</option>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Название товара</FormLabel>
                            <Input value={name} onChange={(e) => setName(e.target.value)}
                                   placeholder='Введите название товара'/>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Стоимость</FormLabel>
                            <Input value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                   placeholder='Введите стоимость товара'/>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel cursor={'pointer'} width={'fit-content'}>
                                <Button pointerEvents={'none'} colorScheme='pink'>Изображение товара</Button>
                            </FormLabel>
                            <span>{file && file.name}</span>
                            <Input type={'file'} display={'none'} accept="image/jpeg" onChange={selectFile}/>


                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Описание товара</FormLabel>
                            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)}
                                   placeholder='Введите описание товара'/>
                        </FormControl>
                        <Button onClick={addInfo}>Добавить новое свойство</Button>
                        {info.map(property =>
                            <Flex gap={'15px'} alignItems={'flex-end'} my={3} key={property.id}>
                                <FormControl>
                                    <Input
                                        value={property.title}
                                        onChange={(e) => changeInfo('title', e.target.value, property.id)}

                                        placeholder='Название свойства'/>
                                </FormControl>
                                <FormControl>
                                    <Input
                                        value={property.description}
                                        onChange={(e) => changeInfo('description', e.target.value, property.id)}
                                        placeholder='Описание свойства'/>
                                </FormControl>
                                <Button colorScheme='red'
                                        p={5}
                                        variant='outline'
                                        onClick={() => removeInfo(property.id)}
                                >
                                    Удалить
                                </Button>
                            </Flex>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='pink' mr={3} onClick={addDevice}>
                            Добавить
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
});

export default CreateItem;