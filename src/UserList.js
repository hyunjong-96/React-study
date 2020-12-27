import React,{useEffect} from 'react'

function User({user,index,onRemove,onToggle}){
    useEffect(()=>{
        console.log('user값이 설정됨')
        console.log(user)
        return()=>{
            console.log('user가 바뀌기전..')
            console.log(user)
        }
    },[user])
    const testClick=()=>{
        console.log('!!!!!!!!!!!!!!!!!')
    }
    return(
        <div>
            <b
                style={{
                    cursor:'pointer',
                    color:user.active ? 'green' : 'black'
                }}
                onClick={()=>onToggle(user.id)}
            >{user.id} {user.username}</b> <span>({user.email})</span>
            <button onClick={()=>onRemove(user.id)}>삭제</button>
            <button onClick={testClick}>test</button>
        </div>
    )
}

function UserList({users,onRemove,onToggle}) {
    useEffect(()=>{
        console.log('users부모컴포넌트')
        console.log(users)
        return()=>{
            console.log('users여긴 뭘까')
            console.log(users)
        }
    },[users])
    return(
        <div>
            {users.map((user,index)=>(
                <User user={user} index={index} onRemove={onRemove} onToggle={onToggle} key={user.id}/>
            ))}
        </div>
    )
}

export default UserList