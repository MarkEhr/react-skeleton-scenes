import Login from "../../scenes/Login/Login";
import Register from "../../scenes/Register/Register";

export const paths={
    login:'/login',
    register:'/register'
};

const notLoggedRoutes=[
    {path:paths.login, Component: Login},
    {path:paths.register, Component: Register},
];

export default notLoggedRoutes;
