import React from 'react'

function User({user,index,onRemove,onToggle}){
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
        </div>
    )
}

function UserList({users,onRemove,onToggle}) {
    return(
        <div>
            {users.map((user,index)=>(
                <User user={user} index={index} onRemove={onRemove} onToggle={onToggle} key={user.id}/>
            ))}
        </div>
    )
}

export default UserList