import { CLOSE_SIDENAVIGATION, OPEN_SIDENAVIGATION } from "../../Actions/OpenCloseSideNavigatiion/OpenCloseSideNavigatiion";


const initialState = {
    
    OpenCloseSideNavigation : false
}

const OpenCloseSideNavigationReaducer = ( state = initialState, action ) => {

    if( action.type === OPEN_SIDENAVIGATION) {

        return {
            ...state,
            OpenCloseSideNavigation : true
        }

    }
    else if( action.type === CLOSE_SIDENAVIGATION ) {

        return {
            ...state,
            OpenCloseSideNavigation : false
        }

    } else {

        return state;

    }  
}
export default OpenCloseSideNavigationReaducer;