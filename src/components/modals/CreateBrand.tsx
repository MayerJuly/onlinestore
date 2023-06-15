import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Button, FormControl, FormLabel, Input, useToast,
} from '@chakra-ui/react'
import {useRef, useState} from "react";
import {createBrand} from "../../http/itemAPI";

const CreateBrand = () => {
    const toast = useToast();
    const [value, setValue] = useState('');


    const addBrand = () => {
        createBrand({name: value}).then(data => {
            setValue('')
            onClose();
            toast({
                title: 'Бренд успешно добавлен.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

        })

    }
    const initialRef = useRef(null)
    const {isOpen, onOpen, onClose} = useDisclosure()
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
            >Добавить бренд</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить бренд</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Название бренда</FormLabel>
                            <Input value={value} onChange={e => setValue(e.target.value)}
                                   placeholder='Введите название бренда'/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={addBrand} colorScheme='pink' mr={3}>
                            Добавить
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateBrand;