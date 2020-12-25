import React,{useRef,useState} from 'react'
import Hello from './Hello'
import Wrapper from './Wrapper'
import Counter from './Counter'
import InputSample from './InputSample'
import UserList from './UserList'
import CreateUser from './CreateUser'
import './App.css'

function App() {
  // const name = 'react'
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: 24,
  //   padding: '1rem'
  // }
  const [inputs,setInputs]=useState({
    username:'',
    email:''
  })
  const {username,email}=inputs
  const onChange=e=>{
    const {name,value}=e.target
    setInputs({
      ...inputs,
      [name]:value
    })
  }
  const [users,setUsers] = useState([
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
  ]);

  const nextId=useRef(4)

  const onCreate=()=>{
    const user={
      id:nextId.current,
      username,
      email,
      active:true
    }
    setUsers([...users,user])

    setInputs({
      username:'',
      email:''
    })
    nextId.current+=1
  }
  const onRemove=(id)=>{
    setUsers(users.filter(user=>user.id !== id))
  }
  const onToggle=id=>{
    setUsers(
      users.map(user=>
        user.id === id ? {...user,active:!user.active} : user
        )
    )
  }
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
    <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
