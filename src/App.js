
import './App.css';
import { useEffect, useState } from 'react';
import { EmpolyeeData } from './EmpolyeeData';

function App() {
  const [data, setData] = useState([])
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState()
  const [id, setId] = useState(0)
  const [update, setUpdate] = useState(false)

  useEffect(()=>{
    setData(EmpolyeeData)
  },[])

   const handleEdit = (id)=>{
    const dt = data.filter((item) => 
      item.id === id
    )
    if(dt !== undefined){
      setId(id)
      setUpdate(true)
      setFirstname(dt[0].firstname);
      setLastname(dt[0].lastname);
      setAge(dt[0].age);
    }
   }

   const handleDelete = (id)=>{
    if(id>0){
      if(window.confirm('Are you sure to Delete this Item')){
        const dt = data.filter((item)=>
          item.id !== id
        )
      setData(dt)
      }
    }
    
   }

   const handleSave = (e)=>{
      e.preventDefault();
      const dt = [...data];
      const newObj = {
        id: EmpolyeeData.length + 1,
        firstname: firstname,
        lastname: lastname,
        age: age
      }
      dt.push(newObj)
      setData(dt)
   }

   const handleUpdate = () =>{
    const index = data.map((item) =>{
      return item.id
    }).indexOf(id)
    console.log('INDEX..',index);
    const dt = [...data];
    console.log(dt);
    dt[index].firstname = firstname;
    dt[index].lastname = lastname;
    dt[index].age = age;

    setData(dt);
    handleClear();
   }

   const handleClear= ()=>{
    setUpdate(false)
    setFirstname('');
    setLastname('');
    setAge('');
   }
  return (
    <>
    <div style={{display: 'flex', justifyContent:'center', marginTop:'10px', marginBottom:'10px'}}>
      <div>
        <label>First_Name:
          <input type='text' placeholder='Enter Your First Name' onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
        </label>
      </div>
      <div>
        <label>Last_Name:
          <input type='text' placeholder='Enter Your Last_Name' onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
        </label>
      </div>
      <div>
        <label>Age:
          <input type='text' placeholder='Enter Your Age' onChange={(e)=>setAge(e.target.value)} value={age}/>
        </label>
      </div>
      <div>
        {
          !update ?
          <button className='btn btn-primary m-1'onClick={(e)=>{handleSave(e)}}>Save</button>
          :
          <button className='btn btn-primary m-1' onClick={()=>{handleUpdate()}}>update</button>
        }
        
        <button className='btn btn-danger' onClick={()=>{handleClear()}}>Clear</button>
      </div>
    </div>
    <table className='table table-hover'>
      <thead>
        <tr>
        <td>S_No.</td>
        <td>First_Name</td>
        <td>Last_Name</td>
        <td>Age</td>
        <td>Action</td>
        </tr>
      </thead>
      <tbody>
      {data.map((curElem,Index)=>{
        return(
        <tr key={Index}>
        <td> {curElem.id} </td>
        <td> {curElem.firstname} </td>
        <td> {curElem.lastname} </td>
        <td> {curElem.age} </td>
        <td>
          <button className='btn btn-primary' onClick={()=>{handleEdit(curElem.id)}}
          >Edit</button>
          <button className='btn btn-danger m-1' onClick={()=>{handleDelete(curElem.id)}}>Delete</button>
        </td>
        </tr>
        )
      })}
      </tbody>
    </table>
    </>
  )
}

export default App;
