import ItemPage from "../pages/ItemPage/ItemPage";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Auth from "../pages/Auth/Auth";
import WishList from "../pages/WishList/WishList";

export const publicRoutes = [
    {path: '/home', element: Home},
    {path: '/item/:id', element: ItemPage},
    {path: '/login', element: Auth},
    {path: '/register', element: Auth},
]

export const privateRoutes = [
    {path: '/home', element: Home},
    {path: '/item/:id', element: ItemPage},
    {path: '/wishlist', element: WishList},
]

export const adminRoutes = [
    {path: '/admin', element: Admin},
    {path: '/home', element: Home},
    {path: '/item/:id', element: ItemPage},
    {path: '/wishlist', element: WishList},
]