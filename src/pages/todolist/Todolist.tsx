import { useState } from "react";
import DeleteModal from "../../common/modal/DeleteModal";
interface data{
    title:string;
    description:string;
}
const TodoList = () => {

    const[deleteId,setDeleteId] =useState<number>()
    const [edit,setEdit] = useState(false);
    const [editId,setEditId] = useState<number>();
  const [data, setData] = useState<data>({
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list,setList] = useState<data[]>([]);

  const handelChange = (e:any) =>{
    const {name,value} = e.target;
   setData((prev)=>({
    ...prev,
    [name]:value
   }))
  }

  const pushList = () =>{
    if(edit && editId!=undefined)
    {
      const newitem = [...list];
      newitem[editId]=data;
      setList(newitem);
      setData({
        title:"",
        description:""
      })
      setEdit(false);
      setEditId(undefined);
    }
    else{
      setList(prev=>[...prev,data])
      setData({
        title:"",
        description:""
      })
    }
  }

  const DeleteItem = ()=>{
    if(deleteId!== undefined)
    {
        const data =[...list];
       const ans = data.filter((item:any,index:number)=>index!==deleteId);
       setList(ans);
       console.log("ans==>",ans);
       
       setDeleteId(undefined)
    }
    console.log("delete item,");
    
  }

  const handleEdit = (item:data) =>{
    console.log("iten is ",item);
    setData({...item})
  }
  console.log("list",deleteId);
  
  return (
    <div className="wrapper">
      <div className="new">
        <div className="again">
          <input
            placeholder="Add title"
            className="input"
            name="title"
            value={data?.title}
            type="text"
            onChange={(e)=>handelChange(e)}
          />
          <input
            placeholder="Add description"
            type="text"
            name="description"
            value={data?.description}
            className="input mt-4"
            onChange={(e)=>handelChange(e)}

          />
          <div className="button">
            <button onClick={pushList} className="btn"> {edit ? "Edit Task":"ADD TASK"}</button>
          </div>
        </div>
      </div>
      <div className="list">
        {list?.map((item:data,index:number)=>{
            return(
                <div className="single">
                <div>
                  <p className="newp nh">{item?.title}</p>
                  <span>{item?.description}</span>
                </div>
                <div className="right">
                  <p className="newp edit_"  onClick={()=>{
                    handleEdit(item);
                    setEditId(index);
                    setEdit(true);
                  }} >Edit</p>
                  <button className="btnnew" onClick={()=>{
                    handleShow();
                    setDeleteId(index);
                  }}>Delete</button>
                </div>
              </div>
            )
        })}
       
      </div>
      <DeleteModal deleteItem={DeleteItem} show={show} handleclose={handleClose}/>
    </div>
  );
};
export default TodoList;
