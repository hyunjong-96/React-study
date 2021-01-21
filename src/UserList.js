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
    return(
        <div>
            {console.log('User 컴포넌트 렌더')}
            <b
                style={{
                    cursor:'pointer',
                    color:user.active ? 'green' : 'black'
                }}
                onClick={()=>onToggle(user.id)}
            >{user.id} {user.username}</b> <span>({user.email})</span>
            <button onClick={()=>onRemove(user.id)}>삭제</button>
        </div>
    )
}

function UserList({users,onRemove,onToggle}) {
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
                <User user={user} index={index} onRemove={onRemove} onToggle={onToggle} key={user.id}/>
            ))}
        </div>
    )
}

export default React.memo(UserList)