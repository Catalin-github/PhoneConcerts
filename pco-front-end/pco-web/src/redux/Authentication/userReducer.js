import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_ERROR,
  EDIT_PROFILE,
  CONCERT_LIST,
  RESET_VALIDATION
} from "./actionType";

const initialState = {
  user: [],
  items:[],
  showList:false,
  loading: true,
  loaded: false,
  verify: false,
  error: "",
  isAuth: false,
  edit: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
       loaded:false,
       loading:true,
       isAuth:false,    
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        loading: false,
        loaded:true  ,
        isAuth: true,
        user: action.payload,
      };
    case LOGIN_ERROR:
      return {                   
        ...state,               
        loading: false,       
        loaded: true,
        items:[],
        showList:false,
        error: action.payload,
        user:[],
        isAuth: false,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        edit: !state.edit,
      };
      
      case CONCERT_LIST :
        return{
          ...state,
          items:action.payload,
          showList:true
        }
     
      case RESET_VALIDATION:
        return{
          ...state,
          error:""
        }
      default:
      return state;
  }
};

export default userReducer;
