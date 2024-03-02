import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
interface Iprops{
    show:boolean;
    handleclose: ()=>void;
    deleteItem:()=>void;
}
const DeleteModal = ({show,handleclose,deleteItem}:Iprops) =>{
    return(
        <Modal centered show={show} onHide={handleclose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:"center"}}>Are , You Sure You want to delete this Item</Modal.Body>
        <Modal.Footer className='d-flex align-items-center justify-content-center'>
          <Button variant="secondary" onClick={handleclose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>{
            handleclose();
            deleteItem();
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default DeleteModal