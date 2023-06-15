import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import "./navbar.scss"
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';



interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItemProps>;
    href?: string;

}


interface NavItemProps extends NavItem{
    id: number;
    children?: Array<NavItemProps>;
    type?:string;
}






const Navbar = observer(() => {



    const NAV_ITEMS: Array<NavItem> = [
        {
            label: 'Каталог',
            children: [
                {
                    label: 'Бренды',
                    subLabel: 'Apple, Xiaomi и другие',
                    href: '#',
                    children: [],
                    id: 1,
                    type:"brands"
                },
                {
                    label: 'Типы',
                    subLabel: 'Смартфоны, Умные Часы и другие',
                    href: '#',
                    children: [],
                    id:2,
                    type:"types"
                },
            ],
        },
    ];






    const {user, item} = useContext(Context);
    let navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();
    const objectBrands = NAV_ITEMS[0].children?.find(element => element.label === 'Бренды')
    const objectTypes = NAV_ITEMS[0].children?.find(element => element.label === 'Типы')
    item.brands.map((brand) => {
        objectBrands?.children?.push({'label': brand.name, 'id': brand.id, 'type': 'brands'})
    })
    item.types.map((type) => {
        objectTypes?.children?.push({'label': type.name, 'id': type.id, 'type': 'types'})
    })

    const logOut = () => {
        user.setUser({})
        localStorage.removeItem('token')
        user.setIsAuth(false)
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'au to' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        m={0}
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon m={0} w={3} h={3} /> : <HamburgerIcon m={0} w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} cursor={'pointer'} onClick={() => navigate('/home')}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}
                        fontSize={'2xl'}>
                        OnlineStore
                    </Text>

                    <Flex align={'center'} display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav rootFlag={true} NAV_ITEMS={NAV_ITEMS} />
                    </Flex>
                </Flex>
                {user.isAuth?
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        align={'center'}

                        direction={'row'}
                        spacing={6}>
                        {user.user.role==='ADMIN' &&
                        <Button display={{base:"none", md:"block"}} onClick={(event) => {
                            event.preventDefault();
                            navigate('/admin')
                        }}
                            as={'a'}
                            fontSize={'md'}
                            fontWeight={400}
                            variant={'link'}
                            href={'#'}>
                            Панель администратора
                        </Button>
                        }
                        <Button  onClick={(event) => {
                            event.preventDefault();
                            navigate('/wishlist')
                        }}
                                 as={'a'}
                                 fontSize={'md'}
                                 fontWeight={400}
                                 variant={'link'}
                                 href={'#'}>
                            <ShoppingBasketIcon/>
                        </Button>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            href={'#'}
                            _hover={{
                                bg: 'pink.300',
                            }}
                            onClick={(event) => {
                                event.preventDefault();
                                logOut();
                            }}>
                            Выйти
                        </Button>
                        <LogoutIcon className={'logoutIcon'}   onClick={(event) => {
                            event.preventDefault();
                            logOut();
                        }}/>

                        <Text  display={{base:"none", md:"block"}} fontSize={'xl'}>
                            {user.user.name}
                        </Text>
                    </Stack>
                    :
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}

                        direction={'row'}
                        spacing={6}>
                        <Button
                            as={'a'}
                            fontSize={'md'}
                            fontWeight={400}
                            variant={'link'}
                            href={'#'}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate('/login')
                            }}>
                            Войти
                        </Button>
                        <Button
                            as={'a'}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'md'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            href={'#'}
                            _hover={{
                                bg: 'pink.300',
                            }}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate('/register')
                            }}
                        >
                            Регистрация
                        </Button>
                    </Stack>
                }

            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav NAV_ITEMS={NAV_ITEMS} />
            </Collapse>
        </Box>
    );
})

interface DesktopProps {
    NAV_ITEMS: Array<NavItem>,
    rootFlag?: boolean
}

const DesktopNav = ({NAV_ITEMS, rootFlag, ...props}:DesktopProps) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'}  placement={rootFlag? "bottom-start" : 'right-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'lg'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                            <DesktopSubNav key={child.id} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>

                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = observer(({ label, href, subLabel, children }: NavItemProps) => {
    const {item} = useContext(Context)
    return (
        <>
        <Popover trigger={'hover'} placement={'right-end'}>
            <PopoverTrigger>
            <Link
                href={href}
                role={'group'}
                display={'block'}
                p={2}
                rounded={'md'}
                _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                <Stack direction={'row'} align={'center'}>
                    <Box>
                        <Text
                            transition={'all .3s ease'}
                            _groupHover={{ color: 'pink.400' }}
                            fontWeight={500}
                            fontSize={'lg'}
                        >
                            {label}
                        </Text>
                        <Text fontSize={'md'}>{subLabel}</Text>
                    </Box>
                    <Flex
                        transition={'all .3s ease'}
                        transform={'translateX(-10px)'}
                        opacity={0}
                        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                        justify={'flex-end'}
                        align={'center'}
                        flex={1}>
                        <Icon m={0} color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                    </Flex>
                </Stack>
            </Link>
            </PopoverTrigger>
            {children && (
                <PopoverContent
                    border={0}
                    boxShadow={'xl'}
                    p={4}
                    bg={'white'}
                    rounded={'xl'}
                    minW={'sm'}>
                    <Stack>
                        {children?.map((child) => (
                            <div key={child.id} onClick={() => {
                                if(child.type === 'brands') {
                                    item.brands.map((brand) => {
                                        if(child.id === brand.id) {
                                            item.setSelectedBrand(brand)
                                        }
                                    })

                                } else if(child.type === 'types') {
                                    item.types.map((type) => {
                                        if(child.id === type.id) {
                                            item.setSelectedType(type)
                                        }
                                    })
                                }

                            }}>

                            <DesktopSubNav  {...child} />
                            </div>
                        ))}
                    </Stack>
                </PopoverContent>
            )}
        </Popover>
        </>
    );
});

interface MobileProps {
    NAV_ITEMS: Array<NavItem>
}

const MobileNav = ({NAV_ITEMS}:MobileProps) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = observer(({ label, children, href }: NavItem) => {
    const {item} = useContext(Context)
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack  >
            <Flex onClick={children && onToggle}
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text

                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        m={0}
                        w={4}
                        h={4}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                    children.map((child) => (

                        <MobileSubNavItem key={child.id} {...child} />
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
});

const MobileSubNavItem = observer(({ label, children, href }: NavItem) => {
    const {item} = useContext(Context)
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack  >
            <Flex onClick={children && onToggle}
                  py={2}
                  as={Link}
                  href={href ?? '#'}
                  justify={'space-between'}
                  align={'center'}
                  _hover={{
                      textDecoration: 'none',
                  }}>
                <Text

                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        m={0}
                        w={4}
                        h={4}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                    children.map((child) => (
                        <div key={child.id} onClick={() => {
                            if(child.type === 'brands') {
                                item.brands.map((brand) => {
                                    if(child.id === brand.id) {
                                        item.setSelectedBrand(brand)

                                    }
                                })

                            } else if(child.type === 'types') {
                                item.types.map((type) => {
                                    if(child.id === type.id) {
                                        item.setSelectedType(type)
                                    }
                                })
                            }

                        }}>
                            <MobileSubNavItem {...child} />
                        </div>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
});




export default Navbar;