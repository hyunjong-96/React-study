import React,{useEffect,useContext} from 'react'
import {UserDispatch} from './App'

const User=React.memo(function User({user}){

    useEffect(()=>{
        console.log('user값이 설정됨')
        console.log(user)
        return()=>{
            console.log('user가 바뀌기전..')
            console.log(user)
        }
    },[user])

    const dispatch = useContext(UserDispatch)

    return(
        <div>
            {console.log('User 컴포넌트 렌더')}
            <b
                style={{
                    cursor:'pointer',
                    color:user.active ? 'green' : 'black'
                }}
                onClick={()=> dispatch({
                    type:'TOGGLE_USER',
                    id:user.id
                })}
            >{user.id} {user.username}</b> <span>({user.email})</span>
            <button onClick={()=>dispatch({
                type:'REMOVE_USER',
                id:user.id
            })}>삭제</button>
        </div>
    )
})

function UserList({users}) {
    useEffect(()=>{
        console.log('UserList컴포넌트 화면에 나타남')
        console.log(users)
        return()=>{
            console.log('UserList컴포넌트 화면에 사라짐')
            console.log(users)
        }
    },[users])
    return(
        <div>
            {console.log('UserList컴포넌트 렌더')}
            {users.map((user,index)=>(
                <User user={user} index={index} key={user.id}/>
            ))}
        </div>
    )
}

export default React.memo(UserList)