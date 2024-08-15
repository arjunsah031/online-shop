import { OPNE_CLOSE_SIGNUP_LOGIN } from "@/reusableui/MyCustumConstat/MyCustumConstat";
import { LOGINSIGNUP_BOX } from "../../Actions/LoginSignupBox/LoginSignupBox";

const initalState = {

    showLoginSignBox : OPNE_CLOSE_SIGNUP_LOGIN.closeBox

}

const LoginsignupBoxReducer = ( state = initalState, action ) => {

    if( action.type === LOGINSIGNUP_BOX ) {

        return {
            
            ...state,
            showLoginSignBox: action.BoxType
        }

    } else {

        return { ...state }
    }
    
}
export default LoginsignupBoxReducer;