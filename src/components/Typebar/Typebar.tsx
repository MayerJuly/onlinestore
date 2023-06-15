import React, {ReactNode, useContext} from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps, Button, useToast,
} from '@chakra-ui/react';

import MenuIcon from '@mui/icons-material/Menu';

import { ReactText } from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import ItemStore from "../../store/ItemStore";








const Typebar = observer(({ children }: { children: ReactNode }) => {


    return (
        <Box minH={{base:"100vh", md: "calc(100vh - 60px)"}} bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent/>

            <Flex minH={'inherit'} justifyContent={"spaceBetween"} flexDirection={'column'} alignItems={'center'} ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Flex>
        </Box>
    );
})

const SidebarContent = observer(({ ...rest }) => {
    const {item} = useContext(Context)
    const toast = useToast()
    return (
        <Box
            ml={'20px'}
            overflow={'hidden'}
            borderRadius={'20px'}
            display={{ base: 'none', md: 'block' }}
            mt={'90px'}
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            minH={'100px'}
            {...rest}>
            {item.types.map((type) =>
                (
                <NavItem

                    color={type.id === item.selectedType?.id? 'white' : ''}
                    bg={type.id === item.selectedType?.id? 'pink.400' : ''}
                    _hover={type.id === item.selectedType?.id? {
                        bg: 'pink.400',
                        color: 'white',
                    } : {
                        bg: 'pink.400',
                        color: 'white',
                    }}
                    onClick={() => item.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </NavItem>
            ))}
            <Button
                mt={2}
                w={'full'}
                colorScheme={'pink'}
                variant='ghost'
                onClick={() => {

                    item.setSelectedType(null)
                    item.setSelectedBrand(null)
                    toast({
                        title: 'Фильтры были сброшены.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                }}>
                Сбросить фильтры
            </Button>

        </Box>

    );
});

interface NavItemProps extends FlexProps {
    children: ReactText;
}
const NavItem = ({ children, ...rest }: NavItemProps) => {
    return (
        <Link href="#" style={{ textDecoration: 'none'}} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                role="group"
                m={0}
                cursor="pointer"


                {...rest}>
                {children}
            </Flex>
        </Link>
    );
};

export default Typebar;