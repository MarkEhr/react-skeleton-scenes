import Admin from "../scenes/Admin/Admin";

export default (user)=>{

    if(!user)
        return null;

    //Basic user
    if(!user.role)
        return null;//Normal user screen

    switch (user.role.name) {
        case 'SUPER_ADMIN':
            return Admin;
        default:
            return null;//Normal user screen
    }
}
