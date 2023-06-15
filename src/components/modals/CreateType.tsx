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
import {createType} from "../../http/itemAPI";

const CreateType = () => {
    const initialRef = useRef(null)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast();

    const [value, setValue] = useState('');

    const addType = () => {
        createType({name: value}).then(data => {
            setValue('');
            console.log(data)

        })
        onClose();
        toast({
            title: 'Тип товара успешно добавлен.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })

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
            >Добавить тип</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить тип</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Название типа</FormLabel>
                            <Input value={value} onChange={e => setValue(e.target.value)}
                                   placeholder='Введите название типа'/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='pink' mr={3} onClick={addType}>
                            Добавить
                        </Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateType;