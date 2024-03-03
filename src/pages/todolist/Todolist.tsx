/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import DeleteModal from "../../common/modal/DeleteModal";
import axios from "axios";
import ReactLoading from "react-loading";
import { AddTodo, AllList, DeleteTodo, EditTodo } from "../../services/Api";
import { toast } from "react-toastify";
export interface data {
  title: string;
  description: string;
  _id?: any;
}

const TodoList = () => {
  const [deleteId, setDeleteId] = useState<string>();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string>();
  const [data, setData] = useState<data>({
    title: "",
    description: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [list, setList] = useState<data[]>([]);

  const listing = async () => {
    setLoading(true);
    try {
      const response = await AllList();
      if (response) {
        setList(response?.data?.users);
        setLoading(false);
      }
    } catch {
      (e: any) => console.log("e");
      setLoading(false);
    }
  };

  const handelChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const pushList = async () => {
    if (edit && editId != undefined) {
      try {
        const newItem = await EditTodo(editId, {
          title: data?.title,
          description: data?.description,
        });
        if (newItem?.data?.success) {
          toast.success(newItem?.data?.message);
          listing();
          setData({
            title: "",
            description: "",
          });
          setEdit(false);
          setEditId(undefined);
        }
      } catch {
        (e: any) => console.log("e");
      }
    } else {
      // setList(prev=>[...prev,data]);
      const res = await AddTodo(data);
      if (res?.data?.status === 201) {
        setTimeout(() => {}, 4000);
        listing();

        toast.success(res?.data?.message);
      }

      setData({
        title: "",
        description: "",
      });
    }
  };

  const DeleteItem = async () => {
    try {
      if (deleteId !== undefined) {
        const res = await DeleteTodo({ id: deleteId });
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          listing();
        }
      }
    } catch {
      (e: any) => console.log("e", e);
    }
  };

  const handleEdit = (item: data) => {
    setData({ ...item });
  };

  useEffect(() => {
    listing();
  }, []);

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
            onChange={(e) => handelChange(e)}
          />
          <input
            placeholder="Add description"
            type="text"
            name="description"
            value={data?.description}
            className="input mt-4"
            onChange={(e) => handelChange(e)}
          />
          <div className="button">
            <button onClick={pushList} className="btn">
              {" "}
              {edit ? "Edit Task" : "ADD TASK"}
            </button>
          </div>
        </div>
      </div>
      <div className="list">
        {loading ? (
          <>
            <ReactLoading />{" "}
          </>
        ) : (
          <>
            {list.length > 0 ? (
              <>
                {" "}
                {list?.map((item: data, index: number) => {
                  return (
                    <div className="single">
                      <div>
                        <p className="newp nh">{item?.title}</p>
                        <span>{item?.description}</span>
                      </div>
                      <div className="right">
                        <p
                          className="newp edit_"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            handleEdit(item);
                            setEditId(item?._id);
                            setEdit(true);
                          }}
                        >
                          Edit
                        </p>
                        <button
                          className="btnnew"
                          onClick={() => {
                            handleShow();
                            console.log("item", item);
                            if (item?._id !== null) {
                              setDeleteId(item?._id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1 style={{ marginTop: "50px" }}>No todo Added</h1>
            )}
          </>
        )}
      </div>
      <DeleteModal
        deleteItem={DeleteItem}
        show={show}
        handleclose={handleClose}
      />
    </div>
  );
};
export default TodoList;
