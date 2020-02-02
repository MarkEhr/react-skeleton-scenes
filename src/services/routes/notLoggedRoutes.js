import Login from "../../scenes/Login/Login";
import Register from "../../scenes/Register/Register";

export const paths={
    login:'/login',
    register:'/register'
};

const notLoggedRoutes=[
    {path:paths.login, component: Login},
    {path:paths.register, component: Register},
];

export default notLoggedRoutes;
