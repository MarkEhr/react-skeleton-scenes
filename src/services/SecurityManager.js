import {createContext} from 'react';
import _ from 'lodash';


export default class SecurityManager{

    constructor(me){

        if( !me )
            throw new Error("The Security object requires an user to be initialized");

        this.me = me;
        this.role = (me.role && me.role.name) ? me.role.name:'';
        this.permissions = me.permissionsArray||[];
    }

    havePermission($permission){
        if(this.role==='SUPER_ADMIN'){
            return true;
        }
        return _.includes(this.permissions, $permission);
    }

    haveAllPermissions= (permissions=[])=>
        this.role==='SUPER_ADMIN' || permissions.reduce((haveAll, permission)=>haveAll&&this.havePermission(permission), true);

    haveAtLeastOnePermission= (permissions)=>
        this.role==='SUPER_ADMIN' || !!_.intersection(this.permissions, permissions).length>0;

    isActualUser= (user)=> !!(user && user.id===this.me.id );

    canSeeEntity= ()=>true;
}

export const SecurityContext = createContext(null);
