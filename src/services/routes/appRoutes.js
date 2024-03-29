import FrontDesk from "../../scenes/Entity/EntityList";

export const paths={
    entity: '/entity/list'
};

const getAppRoutes =(securityManager)=>{

    let routes = [];

    if(securityManager.canSeeEntity())
        routes.push({path:paths.entity, Component: FrontDesk});

    return routes;
};


export default getAppRoutes;
