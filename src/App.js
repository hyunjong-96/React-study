import React,{useRef,useState,useMemo,useCallback} from 'react'
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

function App() {
  // const name = 'react'
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: 24,
  //   padding: '1rem'
  // }
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
    <CreateUser />
    <UserList users={[]}/>
    <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
