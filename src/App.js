import React,{useRef,useState,useMemo,useCallback,useReducer} from 'react'
import Hello from './Hello'
import Wrapper from './Wrapper'
import Counter from './Counter'
import InputSample from './InputSample'
import UserList from './UserList'
import CreateUser from './CreateUser'
import './App.css'

function countActiveUsers(users){
  console.log('활성 사용자 수 세는중...')
  return users.filter(user=>user.active).length
}

const initialState = {
  inputs:{
    username:'',
    email:''
  },
  users:[
    {
      id: 1,
      username: 'lee',
      email: 'lee@naver.com',
      active:true
    },
    {
      id: 2,
      username: 'hyun',
      email: 'hyun@naver.com',
      active:false
    },
    {
      id: 3,
      username: 'jong',
      email: 'jong@gmail.com',
      active:false
    }
  ]
}

function reducer(state,action){
  switch(action.type){
    case 'CHANGE_INPUT':
      console.log('reducer action:',action)
      return{
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]:action.value
        }
      };
    case 'CREATE_USER':
      return{
        inputs:initialState.inputs,
        users:[...state.users,action.user]
      };
    case 'TOGGLE_USER':
      return{
        ...state,
        users: state.users.map(user=>user.id === action.id ? {...user, active:!user.active}:user)
      };
    case 'REMOVE_USER':
      return{
        ...state,
        users: state.users.filter(user=>user.id !== action.id)
      };
    default:
      return state
  }
}

function App() {
  // const name = 'react'
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: 24,
  //   padding: '1rem'
  // }
  
  // const [inputs,setInputs]=useState({
  //   username:'',
  //   email:''
  // })
  // const {username,email}=inputs

  // const onChange=useCallback(e=>{
  //   console.log('onChange함수')
  //   const {name,value}=e.target
  //   setInputs({
  //     ...inputs,
  //     [name]:value
  //   })
  // },[inputs])
  // const [users,setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'lee',
  //     email: 'lee@naver.com',
  //     active:true
  //   },
  //   {
  //     id: 2,
  //     username: 'hyun',
  //     email: 'hyun@naver.com',
  //     active:false
  //   },
  //   {
  //     id: 3,
  //     username: 'jong',
  //     email: 'jong@gmail.com',
  //     active:false
  //   }
  // ]);

  // const nextId=useRef(4)

  // const onCreate=useCallback(()=>{
  //   console.log('onCreate함수')
  //   const user={
  //     id:nextId.current,
  //     username,
  //     email,
  //     active:true
  //   }
  //   console.log('!!!이전 users',users)
  //   setUsers(users=>[...users,user])
  //   console.log('!!!이후 users',users)
  //   setInputs({
  //     username:'',
  //     email:''
  //   })
  //   nextId.current+=1
  // },[username,email])

  // const onRemove=useCallback((id)=>{
  //   console.log('onRemove함수')
  //   setUsers(users=>users.filter(user=>user.id !== id))
  // },[])

  // const onToggle=useCallback(id=>{
  //   console.log('onToggle함수')
  //   setUsers(
  //     users=>
  //     users.map(user=>
  //       user.id === id ? {...user,active:!user.active} : user
  //       )
  //   )
  // },[])
  // const count = useMemo(()=>countActiveUsers(users),[users])
  const [state, dispatch] = useReducer(reducer,initialState)
  const nextId = useRef(4)
  const {users} = state
  const {username, email} = state.inputs

  const onChange=useCallback(e=>{
    const {name,value} = e.target
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    })
  },[])

  const onCreate=useCallback(()=>{
    dispatch({
      type:'CREATE_USER',
      user:{
        id:nextId.current,
        username,
        email
      }
    })
    nextId.current +=1
  },[username,email])

  const onToggle = useCallback(id=>{
    dispatch({
      type:'TOGGLE_USER',
      id
    })
  },[])

  const onRemove = useCallback(id=>{
    dispatch({
      type:'REMOVE_USER',
      id
    })
  },[])

  const count = useMemo(()=>countActiveUsers(users),[users])
  return (
    // <Wrapper>
    //   <Hello name={name} color="red" isSpecial={true}/>
    //   <Hello color="pink"/>
    //   <div style={style}>{name}</div>
    //   <div className='gray-box'></div>
    // </Wrapper>
    //<Counter/>
    //<InputSample/>
    <>
    <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
    <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
    <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
