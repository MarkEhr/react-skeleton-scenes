import Admin from "../scenes/Admin/Admin";
import Customer from "../scenes/Customer/Customer";

export default (user)=>{

    if(!user)
        return null;

    //Basic user
    if(!user.role)
        return Customer;

    switch (user.role.name) {
        case 'SUPER_ADMIN':
            return Admin;
        case 'CUSTOMER':
            return Customer;
        default:
            return null;
    }
}
