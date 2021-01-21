import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useReducer
} from 'react'
import UserList from './UserList'
import CreateUser from './CreateUser'
import useInputs from './hook/useInputs'
import './App.css'
import produce from 'immer'
import ErrorBoundary from './Error/ErrorBoundary'

const initialState = {
  users:[
    {
      id:1,
      username:'lee',
      email:'lee@naver.com',
      active:true
    },
    {
      id:2,
      username:'hyun',
      email:'hyun@naver.com',
      active:false
    },
    {
      id:3,
      username:'jong',
      email:'jong@naver.com',
      active:true
    }
  ]
}

function countActiveUsers(users){
  console.log('활성 사용자 수 세는중...')
  return users.filter(user => user.active).length
}
function reducer(state,action){
  switch (action.type) {
    // case 'CHANGE_INPUT':
    //   return{
    //     ...state,
    //     inputs:{
    //       ...state.inputs,
    //       [action.name]:action.value
    //     }
    //   };
    case 'CREATE_USER':
      // return{
      //   // inputs:initialState.inputs,
      //   users:[...state.users,action.user]
      // };
      return(
        produce((state,draft) =>{
          draft.users.push(action.user)
        })
      )
    case 'REMOVE_USER':
      // return{
      //   ...state,
      //   users:state.users.filter(user=>(
      //     user.id !== action.id 
      //   ))
      // };
      return(
        produce((state,draft)=>{
          const index = draft.users.findIndex(user => user.id === action.id)
          draft.users.splice(index,1)
        })
      )
    case 'TOGGLE_USER':
      return{
        ...state,
        users:state.users.map(user=>(
          user.id === action.id ? {...user,active:!user.active} : user
        ))
      }
    default:
      break;
  }
  return state
}

export const UserDispatch = React.createContext(null)

function App(){
  // const [{username,email},onChange,reset] = useInputs({
  //   username:'',
  //   email:''
  // })
  const [state,dispatch] = useReducer(reducer,initialState)
  const {users} = state
  // const {username,email} = state.inputs
  // const nextId = useRef(4)

  // const onChange=useCallback((e)=>{
  //   const {name,value} = e.target
  //   dispatch({
  //     type:'CHANGE_INPUT',
  //     name,
  //     value
  //   })
  // },[])

  // const onCreate=useCallback(()=>{
  //   const user={
  //     id:nextId.current,
  //     username,
  //     email
  //   }
  //   dispatch({
  //     type:'CREATE_USER',
  //     user
  //   })
  //   reset()
  //   nextId.current += 1
  // },[username,email])

  // const onRemove=useCallback((id)=>{
  //   dispatch({
  //     type:'REMOVE_USER',
  //     id
  //   })
  // },[])

  // const onToggle=useCallback((id)=>{
  //   dispatch({
  //     type:'TOGGLE_USER',
  //     id
  //   })
  // },[])

  const count = useMemo(()=>countActiveUsers(users),[users])
  return (
    <ErrorBoundary>
    <UserDispatch.Provider value={dispatch}>
    <CreateUser />
    <UserList  />
    <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
    </ErrorBoundary>
  );
}

export default App;
