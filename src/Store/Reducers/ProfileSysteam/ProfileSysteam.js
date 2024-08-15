import { PROFILE__DETAILS } from "../../Actions/ProfileSysteam/ProfileSysteam";

const intialState = {

    profileDetails: null

}

const ProfileDetailsReducer = ( state = intialState , action ) => {

    if( action.type === PROFILE__DETAILS ) {

        return {

            ...state,
            profileDetails : action.TypeObject 

        }
    } else {

       return state ;

    }
   
}

export default ProfileDetailsReducer;