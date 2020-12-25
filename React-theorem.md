# 1.react설치

1. yarn global add create-react-app
2. create-react-app [projectName]

# 2.JSX

* JSX는 리액트에서 생김새를 정의할 때 사용하는 문법.HTML같이 생겼지만 JavaScript이다.

  ```jsx
  return <div>안녕하세요</div>
  ```

  

* 리액트 컴포넌트에서 XML형태로 코드를 작성하면 babel이 JSX를 JavaScript로 변환.

* Babel은 javascript의 문법을 확장해주는 도구.

* JSX가 JavaScript로 제대로 변환하기 위한 규칙

  ```
  1. 닫힘 태그 </div> <--이거
  
  2.두개 이상의 태그는 무조건 하나의 태그로 감싸져있어야한다.
  	<div>
  		<Hello/>
  		<div></div>
  	</div>
  	but 스타일 관련 설정이 복잡해질수 있으므로 Fragement사용.
  	
  	<>
  		<Hello/>
  		<div></div>
  	</>
  	Fragment태그는 별도의 엘리먼트로 나타나지 않는다.
  	
  3. JSX내부에 자바스크립트 변수를 보여줘야 할 떄는 {}로 감싼다.
  	function App(){
  		const name = "lee"
  		return(
  			<>
  				<Hello/>
  				<div>{name}</div> <--이거
  			</>
  		)
  	}
  
  4. stlye과 Css class를 설정할때 인라인 스타일은 객체 형태로 작성해야하며, background-color같은 것은 backgroundColor처럼 camelCase사용!
  	function App(){
  		const name='lee'
  		const style={
  			backgroundColor:'black'
  			color:'aqua',
  			fontSize:24 //기본단위px
  			padding:'1rem' //다른 단위 사용 시 문자열로
  		}
  		return(
  			<>
  				<Hello/>
  				<div style={style}>{name}</div>
  			</>
  		)
  	}
  ```

  

# 3.props

* props는 properties의 줄임말. 어떠한 값을 컴포넌트에게 전달해줘야할때 사용한다.

```jsx
function App(){
    cosnt name ="lee"
    return(
    	<>
    	<Hello name={name} color='red'/>
    	</>
    )
}

function Hello({name, color}){
    return(
    	<>
        	<div style={{color:{color}}}>{name}</div>
        </>
    )
}
```

## 1)defaultProps

```jsx
function Hello({name,color}){
	return(
    	<div>{name}</div>
    )
}
Hello.defaultProps={
    name='이름없음'
}
```

컴포넌트로 넘어온 파라미터값이 없다면 defaultProps로 설정된 값을 넣는다.(파라미터Props > defaultProps)

## 2)props.children

```jsx
function App(){
    return(
    	<Wrapper>
        	<Hello name='lee' color='red'/>
        </Wrapper>
    )
}
```

Wrapper컴포넌트로 감싸져있는 Hello컴포넌트의 상관관계는 Wrapper컴포넌트는 부모컴포넌트 Hello컴포넌트는 자식컴포넌트이게 된다.

이떄 Wrapper로 감싸져있는 Hello는 Wrapper에 가려져 보이지 않게 된다.
내부의 내용이 보여지게 하기 위해서는 Wrapper에서 pros.children을 랜더링해주어야한다.

```jsx
function Wrapper({children}){
    const style={
        border:'2px solid black',
        padding:'16px'
    }
    return(
    	<div style={style}>
        	{children}
        </div>
    )
}
```

# 4.조건부 렌더링

* 삼항 연산자 **{[조건] ? [true일떄] : [false일떄]}**
* 또는 **{[조건] && [true일때]}** : 조건이 true일때는 ture일때 해당하는 일을 하고 false일때는 false이다.
* 참고로 jsx에서 null,false,undefined를 렌더링하게 되면 아무것도 나타나지 않는다.
* 컴포넌트의 props값을 설정하게 될때 props의 이름만 작성하고 값 설정을 생략한다면 이를 ture로 설정한 것으로 간주한다.
  isSpecial={ture} == isSpecial

# 5.useState

* 컴포넌트에서 동적인 값을 상태(state)라고 부르는데, useState함수를 사용해서 컴포넌트에서 동적으로 변하는 값(상태)를 관리할수 있다.

```jsx
function Counter(){
    const [number,setNumber]=useState(0)
    
    const onIncrease=()=>{
        setNumber(number+1)
    }
    const onDecrease=()=>{
        setNumber(number-1)
    }
    
    return(
    	<div>
        	<h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}
```

useState를 사용할때 상태의 기본값을 파라미터로 넣어서 호출한다. 이 함수를 호출하면 배열이 반환되는데 **배열 비구조화 할당**을 통해 각 원소를 추출해준다.

그리고 **on이벤트 = {실행하고싶은 함수}**형태로 이벤트를 다루어줄때 실행하고싶은 함수는 **함수의 형태**를 넣어주어야지 함수를 **onIncrease()**같은 형식으로 실행하게 되면 렌더링되는 시점에서 함수가 호출되어버리게된다.

함수에 필요한 값은 useState함수를 통해 사용해주도록한다.

## *함수형업데이트

useState함수에서 반환된 setNumber을 통해 number를 업데이트해줄때 

```jsx
setNumber(number+1) //이방법도 있지만
setNumber(number=>number+1)
//이렇게 업데이트하는 값을 함수를 파라미터로 선언해준다.
```

함수형 업데이트는 주로 컴포넌트를 최적화 할때 사용하게 된다.

# 6.Input

사용자가 입력 할수 있는 Input태그에서 상태를 관리하는 방법은

onChange이벤트를 활용하는것.

```jsx
const [text,setText] = useState('')
function InputSample(){
    const onChange=(e)={
        setText(e.target.value)
    }
    const onReset=()={
        setText('')
    }
    return(
    	<div>
        	<input onChange={onChange} value={text}/>
            <button onClick={onReset}>초기화</button>
            <div>
            	<b>값:{text}</b>
            </div>
        </div>
    )
}
```

* input태그에 텍스트를 입력하면 **값:**에 변경된 텍스트가 렌더링된다.
* onChange함수를 사용할때 파라미터로 들어오는 **e**는 해당 함수를 불러올때 사용한 이벤트 객체이다.
* 이벤트 객체 e의 e.target은 이벤트에서 발생한 DOM(input DOM)을 가리키게된다. 이 DOM의 value값 즉, e.target.value를 조회하면 이벤트에서 발생한 DOM에 입력한 값이 무엇인지 알 수 있게된다.

# 7.여러 input값 관리하기

```jsx
function InputSample(){
    const [inputs,setInputs] = useState({
        userName=''
        nickname=''
    })
    const {userName,nickname}=inputs //비구조화 할당을 통한 값 추출
    const onChange=(e)={
        const {name,value}=e.target//e.tartget안에 있는 name과value 비구조화 할당을 통해 값 추출
        setInputs({
            ...inputs, //spread함수(불변성 유지)
            [name]:value //직접 수정하기않고 spread를 이용해 name에 해당하는 값을 value의 값으로 수정해준다.
        })
    }
    const onReset=()={
        setInputs({
            userName:'',
            nickname:''
        })
    }
    
    return(
    	<div>
            <input placeholder="이름" name="userName" onChange={onChange} value={userName}/>
            <input placeholder="닉네임" name="nickname" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값:</b>
                {name} ({nickname})
            </div>
        </div>
    )
}
```

리액트 상태에서 객체를 수정할때 **inputs[userName]=value;**와 같은 방법으로 직접 수정하면 안되고 새로운 객체를 만들어서 새로운 객체에 변화를 주고 이를 상태로 사용해주어야한다.

```jsx
setInputs({
	...inputs,
	[name]:value
})
```

* **...** 은 spread문법으로 ...뒤의 기존 객체를 복붙해주는것.

* sperad문법을 사용하는 것은 "불변성을 지킨다"라고 부르는데 불변성을 지켜야만 리액트 컴포넌트에서 상태가 업데이트가 됬음을 감지하고 리렌더링이 된다.

* 만약 불변성을 지키지 않고 직접 inputs[name]=value를 사용하여 변경한다면 리렌더링이 되지 않는다.

* 그렇지 않는다면

  ```
  setInputs({
  	userName:'',
  	nickname:''
  })
  ```

  위와 같이 setValue함수를 활용하여 전체를 바꿔주는 방법도 있다.

# 8.useRef로 특정 DOM 선택하기

특정 DOM을 선택해야하는 상황에서 getElementById, querySelector같은 DOM Selector함수를 사용해서 DOM을 선택한다.

하지만 useRef함수를 이용해서 특정 DOM을 선택할수 있다.

```jsx
function InputSample(){
    const nameInput = useRef() //ref를 사용하기 위한 Hook함수
    const onChange=(e)={
        ...
    }
    const onReset=()={
        setInput({
            name:'',
            nickname:'',
        })
        nameInput.current.focus()
    }
    
    return(
    	<input onClick={onChange} ref={nameInput}/>
        <button onClick={onReset}>초기화</button>
    )
}
```

* useRef()함수를 이용하여 ref객체를 만들고 이 객체를 선택하고싶은 DOM에 ref값으로 설정한다.
* 그러면 ref객체의 .current는 우리가 선택한 DOM을 가르키게된다.
* .focus는 DOM API로 선택한 DOM에 포커스이벤트를 실행시키게 하는것.

# 9.배열 렌더링

```javascript
const users = [{
            id: 1,
            username: 'lee',
            email: 'lee@naver.com'
        },
        {
            id: 2,
            username: 'hyun',
            email: 'hyun@naver.com'
        },
        {
            id: 3,
            username: 'jong',
            email: 'jong@gmail.com'
        }
    ];
```

이러한 배열이 있을때 각 index에 해당하는 객체들을 렌더해주고 싶다면 **map**함수를 사용한다.

```jsx
function User({user,index}){//한 파일에서 여러개의 컴포넌트를 선언해줄수 있다.
    return(
    	<div>
            <b>{index} {user.username}</b><span>{user.email}</span>
        </div>
    )
}

function UserList(){
    const users=[{
        ...;
    }]
    return(
    	<div>
        	{users.map((user,index)=>(
            	<User user={user} index={index} key={user.id}/>
            ))}
        </div>
    )
}

export default UserList
```

* map

  ```javascript
  Array.map(( [Value] , [Index] )=>(
  	...;
  ))
  ```

## *배열 렌더링시에 key의 중요성

배열을 랜더링해줄때 

```jsx
<User user={user} index={index} key={user.id}/>
```

user와 index는 넘겨줄 props이고 **key**는 배열을 랜더링해줄때 생각보다 중요한 역할을 해준다.

* https://react.vlpt.us/basic/11-render-array.html (중요!)
* key를 선언해주지 않는다면 배열의 요소들을 랜더링해주고 변경될때마다 div 요소들이 변경된건 해당 인덱스의 요소에서 변경되서 그 뒤 요소부터 싹다 변경되고 인덱스에 맨뒤에는 다시 추가되는등 비효율적(말로 설명하기 힘드니 링크를 보자 맨밑에 있음!!!!!)
* key를 선언해준다면 변경될때 변경된부분이 삭제,변경이 되는것이 아니라 사이에 추가가되어 효율적으로 렌더가 된다.

# 10.useRef로 컴포넌트 안의 변수 만들기

1)ref사용할때

* 특정 DOM을 선택할때
* 컴포넌트안에서 조회 및 수정 할 수 있는 변수를 관리하는 것.

2)useRef로 관리하는 변수는 값이 바뀐다고 컴포넌트가 리랜더링되지않는다.

* 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고나서 그 다음 랜더링 이후로 업데이트 된 상태를 조회할수 있다.

* useRef로 관리하는 변수는 변경 설정후 바로 조회할수 있다.

* 컴포넌트 상태에서 관리하지않고 useRef로 관리하는 이유

  ```
  useRef는 일반적으로 자바스크립트 객체로써, 즉 heap영역에 저장된다. 
  그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때 까지 참조할 떄마다 같은 메모리 주소를 가지게 된다.
  같은 메모리 주소를 가지기 때문에 === 연산에서 항상 true를 반환하게 되고, 값이 바뀌어도 리렌더링 되지 않게된다.
  
  하지만 함수 컴포넌트에서 변수를 선언하여 관리하게 된다면 렌더링 될 때마다 값이 초기화된다.
  ```

3)관리할 수 있는 값

* setTimeout, setInterval을 통해서 만들어진 id
* 외부 라이브러리를 사용하여 생성된 인스턴스
* scroll위치

```javascript
const users = [{
      id: 1,
      username: 'lee',
      email: 'lee@naver.com'
    },
    {
      id: 2,
      username: 'hyun',
      email: 'hyun@naver.com'
    },
    {
      id: 3,
      username: 'jong',
      email: 'jong@gmail.com'
    }
  ];

const nextId = useRef(4) //useRef에 파라미터값을 넣어주게되면 이 값이 .current의 기본값이됨.
const onCreate=()=>{
    nextId.current += 1
}//nextId의 값을 수정할때 .current값을 수정하면되고, 조회할때도 .current값을 조회하면된다.
```

# 11.배열

## 1)항목 추가하기

```jsx
const [inputs,setInputs]=useState({
    username:'',
    email:''
})
const {username,email}=inputs
const [users,setUsers]=useState([
    {
      id: 1,
      username: 'lee',
      email: 'lee@naver.com'
    },
    {
      id: 2,
      username: 'hyun',
      email: 'hyun@naver.com'
    },
    {
      id: 3,
      username: 'jong',
      email: 'jong@gmail.com'
    }
])
const nextId = useRef(4)
const onCreate=()=>{
    const user={
        id:nextId.current,
        username,
        email
    }
    setUsers([...users,user])//users에 새로만든 사용자의 정보를 추가해줄때 spread함수를 사용해서 배열을 수정해준다.
    nextId.current+=1//useRef Hook함수를 사용해서 기본값을 조회해서 수정할수있다(처음에 사용할때 ref의 기본값은 4이므로 .current의 값은 4이다. 그리고 .current값을 조회후 더해줬으므로 ref의 객체 nextId는 5가 됨.)
}
const onChange=(e)=>{
    const {name,value}=e.target
    setInputs({
        ...inputs,
        [name]:value
    })
}
return(
	<>
    	<CreateUser 
            username={username}
            email={email}
            onChange={onChange}//부모컴포넌트에서의 함수를 자식 컴포넌트로 넘겨줘서 사용할수있다.
            onCreate={onCreate}//자식컴포넌트가 부모컴포넌트에 있는 함수를 사용할때 해당 함수에서 사용하는 상태들은 props에 담아서 보내주어야한다.
         />
    	<UserList users={users}/>
    </>
)
```

배열을 추가해줄때 직접적으로 바꿔줄수 없다고 했다(**users[name]=value**) 

* **sperad**

  ```
  *
  setUsers([...users,user])
  ```

  객체의 값을 변경해줄때는 이처럼 {}안에 spread를 사용하여 수정해준다.

  ```
  setInputs({...inputs,[name]:value})
  ```

  배열의 값을 변경해줄때는 두번째 위의 (*표시) 코드처럼 []안에 spread를 사용하여 수정해준다.

  

* **concat**

  ```
  setUsers(users.concat(user))
  ```

  concat은 괄호안의 값을 배열 맨뒤에 추가하여 새로운 배열은 반환하므로 기존의 배열을 한번 복사하고 나서 사용하는 것과 비슷한 원리이므로 수정후 리액트 리렌더링이 가능하다.

  하지만 **push, splice, sort**등의 함수는 기존의 배열을 수정하여 반환하는 것임으로 불변성을 지켜주지 못하게된다.(사용하면 안됨.)

이 둘의 결과는 동등하다.



## 2)항목 제거하기

```jsx
function App(){
    const onRemove=(id)=>{
        setUsers(users.filter(user=>user.id!=id))
    }
    return(
    	<User user={user} onRemove={onRemove}>
    )
}
```

* onRemove함수에서 제거할 객체의 id값을 받았다면 배열에서 해당id객체를 삭제해주어야할때 **filter**함수를 사용한다.
* filter는 배열에서 조건에 해당하는 객체를 골라서 새로운 배열로 반환해준다. 그러므로 user.id와 id가 같지않은 객체만 골라서 **새로운 배열로 반환**해주는것이므로 불변성을 지키게된다.

```jsx
function User({user,onRemove}){
    return(
    	<div>
            <b>{user.username}</b><span>({user.email})</span>
        	<button onClick={()=>onRemove(user.id)}>삭제</button>
        </div>
    )
}
```

* 이벤트를 했을때 함수를 사용하기 위해서는 onClick={onRemove}로 함수타입을 넣어주어야한다.
* 하지만 파라미터값을 사용할떄는 **onClick={()=>onRemove( user.id )}**와 같이 **화살표함수**를 사용하여 함수에 파라미터값을 넣어주면 된다.

## 3)항목 수정하기

배열에서 특정 요소를 클릭했을때 수정하게하는 방법

```jsx
[부모 컴포넌트]
function App(){
const [users,setUsers]=useState([
    {
        id:1,
        username:'lee',
        email:'test@naver.com',
        active:true
    }
])
const onToggle=id={
    setUsers(
    	users.map(user=>
        	user.id === id ? {...user,active:!user.active} : user
        )
    )
}
return(
	<UserList users={users} onToggle={onToggle}/>
)
}
```

자식 컴포넌트에서 id를 가져와서 onToggle함수는 해당 id에 맞는 객체를 찾기위해 map함수를 통해 user를 추출하고 id가 user.id와 맞다면 불변성을 유지하기위해 spread함수를 사용해 active속성을 반대로 변경해준다.

```jsx
[자식 컴포넌트]
function UserList({users,onToggle}){
    //users를 map으로 돌려 user를 가져왔다고 가정함.
    <div>
    	<b
            style={{
                cursor:'pointer',
				color:active ? 'green' : 'black'
            }}
            onClick={()=>onToggle(user.id)}
            >
        </b>
    </div>
}
```

부모컴포넌트의 onToggle를 통해 해당 id를 클릭하게되면 해당id의 요소의active는 반대로 수정되게 된다.