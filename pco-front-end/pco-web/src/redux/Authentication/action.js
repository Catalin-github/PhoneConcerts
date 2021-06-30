import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_ERROR,
  EDIT_PROFILE,
  CONCERT_LIST,
  RESET_VALIDATION
} from "./actionType";
import axios from 'axios'


export const fetchUsersLogin = (email,password) => {
  console.log(email)
  console.log(password)
  return (dispatch) => {
    axios({
      method: 'post',
      url: 'dia-aplication/api/user/login',
      data: {
        email: JSON.stringify(email),
        password: JSON.stringify(password),
      },
      credentials:"include"
    }) 
      .then((res) => {
        console.log(res)
        console.log("sadsdsadadadasdasdas")
        if(res.success === false){ 
          throw new Error('Email or password incorect!');
        }       
        console.log("you are in login")
        console.log(res.data)
        console.log(res.data.user)
        console.log(res.data.dataUserResponse)

        dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.data.success, message:res.data.message }));
      })
      .catch((err) => {
        console.log(err)
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
}
// export const fetchUsersLogin = (email,password) => {
//   return (dispatch) => {
//     axios({
//       method: 'get',
//       url: 'oauth2/authorization/google',
//       // data: {
//       //   email: 'sam@g.c',
//       //   password: 'sam'
//       // }
//     })
//     //  )
  
//       .then((res) => {
//         console.log(res)
        
//         // if(res.success === false){ 
//         //   throw new Error('Email or password incorect!');
//         // }       
//         console.log("you are in login")
//         console.log(res.data)
//         console.log(res.data.user)
//         console.log(res.data.dataUserResponse)

//         // dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.data.success, message:res.data.message }));
//       })
//       .catch((err) => {
//         console.log(err)
//         dispatch(loginError("Login Failed, Please Try Again"));
//       });
//   };
// }
// export const fetchLoginGoogle = (email,password) => {
//   return (dispatch) => {
//     axios({
//       method: 'get',
//       url: 'oauth2/authorization/google',
//       // data: {
//       //   email: 'sam@g.c',
//       //   password: 'sam'
//       // }
//     })
//     //  )
  
//       .then((res) => {
//         console.log(res)
        
//         // if(res.success === false){ 
//         //   throw new Error('Email or password incorect!');
//         // }       
//         console.log("you are in login")
//         console.log(res.data)
//         console.log(res.data.user)
//         console.log(res.data.dataUserResponse)

//         // dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.data.success, message:res.data.message }));
//       })
//       .catch((err) => {
//         console.log(err)
//         dispatch(loginError("Login Failed, Please Try Again"));
//       });
//   };
// }

export const fetchUsersRegister = (data) => {
  return (dispatch) => {
    fetch(`/api/user/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success === false){ 
          throw new Error('Your data is invalid!');
        }      
        dispatch(loginSuccess({ data: res.user, message: res.message, succes:res.success}));
      })

      .catch((err) => {
        dispatch(loginError("This account already exists!"));
        console.error(err.value);
      });
  };
};

export const fetchConcerts = () => {
  return (dispatch) => {
    fetch(`/api/user/concerts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {   

        dispatch(concertList({ list: res.concerts}));
      })

      .catch((err) => {
        dispatch(loginError(err));
        console.error(err.value);
      });
  };
};



export const verifyRefreshToken = () => {
  return (dispatch) => {
    fetch(`/dia-aplication/api/user/isAuthenticated`, {
      mothod: "GET",
      headers: { "Content-Type": "application/json"  },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (!res.success) {
          throw new Error('You are not authenticated!');
        }

        if (res.success) {
          dispatch(loginSuccess({ data: res.dataUserResponse}));
        }
        if(window.location.pathname === "/account"){
          dispatch(loginRequest())
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(loginError(""));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    fetch("api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(loginError());
        }
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};

export const fetchUsersEditProfile = ({firstName,lastName,email,phone}) => {

  return (dispatch) => {

    fetch(`/api/user/editAccount`, {
      method: "POST",
      body: JSON.stringify(firstName,lastName,email,phone),
      headers: {
        "Content-Type": "application/json", 
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.isAuthenticated){}
        dispatch(loginSuccess({ data: res.user }));

   
        dispatch(editProfile());
      })
      .catch((err) => {

        dispatch(loginError(err));
      });
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    fetch(`/api/user/ChangePassword`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(loginError());
      })
      .catch((err) => {
        dispatch(loginError(err));
      });
  };
};
// export const fetchLoginGoogle = () => {
//   return (dispatch) => {
//     fetch("/oauth2/authorization/google", {
//       method: "GET",
//       headers: { "Content-Type": `application/json`, },
//       // body: JSON.stringify({email:credential.email,token:credential.tokenId}),
//       credentials:"include"  
//      })
//       .then((res) =>{   
//       return res.json()
//       })
//       .then((res) => {
//         console.log(res)  
    
//         if(res.success === false){ 
//           throw new Error('Email or password incorect!');
//         }       
//         dispatch(loginSuccess({ data: res.user, success: res.success, message:res.message }));
//       })
//       .catch((err) => {
//         console.log(err)
//         dispatch(loginError("Login Failed, Please Try Again"));
//       });
//   };
// };
export const fetchLoginGoogle = (res) => {
  return (dispatch) => {
    axios({
       url: '/dia-aplication/api/user/google',
      headers: {"Access-Control-Allow-Origin": "http://localhost:3000",'Access-Control-Allow-Credentials':true,'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',"Vary": "Origin","Origin":"http://localhost:3000", "Content-Type": "application/json"},
      data: {
        token: res.tokenId,
      }
 
    })
    //  )
  
      .then((res) => {
        console.log(res)
        
        // if(res.success === false){ 
        //   throw new Error('Email or password incorect!');
        // }       
        console.log("you are in login2222222222222222222222222222222222222222222222222222222222222222222222")
        console.log(res.data)
        console.log(res.data.user)
        console.log(res.data.dataUserResponse)

        // dispatch(loginSuccess({ data: res.data.dataUserResponse, success: res.dta.success, message:res.data.message }));
      })
      .catch((err) => {
        console.log(err+ "you are here")
        console.log("dssssssssssssssssssssssssssssssssssyou are here")
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
};
export const fetchLoginFacebook = (tokenId) => {
  return (dispatch) => {  
    fetch("/login/api/user/auth/facebook", {
      method: "POST",
      headers: { "Content-Type": `application/json` },
      body: JSON.stringify(tokenId),
      credentials: "include",
    })
      .then((res) =>{   
      return res.json()
      })
      .then((res) => {
        if(res.success === false || res.message === ""){ 
          throw new Error('Email or password incorect!');
        }
        dispatch(loginSuccess({ data: res.user, success: res.success, message:res.message }))
             
       })
      .catch((err) => {
        console.log(err)
        dispatch(loginError("Login Failed, Please Try Again"));
      });
  };
};



export const AccountRequest = (email) => {
  return (dispatch) => {
      fetch(`/api/user/account?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) =>{  
    if(res.status>399){
     throw new Error('my error');
    }
       return res.json()
      })
      .then((res) => {
        dispatch(loginSuccess({ data: res }));

   
      })
      .catch((err) => {

      console.log(err.message)
        dispatch(loginError(err));
      });
  };
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (res) => {
  return {
    type: LOGIN_SUCCES,
    payload: res,
  };
};

export const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};

export const editProfile = () => {
  return {
    type: EDIT_PROFILE,
  };
};

export const concertList = (list) => {
  return {
    type: CONCERT_LIST,
    payload:list, 
  }
}
export const resetValidation=()=>{
  return{
    type:RESET_VALIDATION
  }
}
