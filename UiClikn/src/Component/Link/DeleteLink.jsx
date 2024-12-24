import React from "react";
import ReactDOM from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { RxCross1 } from "react-icons/rx";
import { deleteLinkCall } from "../../Store/Api/DeleteAPiActions/deleteLinkSlice";
import { useDispatch, useSelector } from "react-redux";

function DeleteLink({ _id, setDeleteLink }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loadingBarSlice);
  return ReactDOM.createPortal(
    <RemoveScroll>
      <div
        className="w-full fixed inset-0  z-50 
      bg-black bg-opacity-30 flex flex-col  justify-center items-center p-4"
      >
        <div className="bg-white rounded-md p-10 space-y-5">
          <div className="flex justify-between items-center ">
            <h1 className="text-2xl font-bold">Delete link?</h1>
            <RxCross1
              className="text-xl font-bold"
              onClick={() => {
                setDeleteLink(false);
              }}
              role="button"
            />
          </div>
          <p className="text-sm font-bold">
            Deleting this link will redirect it to the clikn error page.
          </p>
          <p className="text-sm font-bold">This cannot be undone.</p>
          <div className="w-full text-end space-x-5 ">
            <button
              className="p-2 hover:bg-lightblue rounded-md duration-500 ease-in-out text-black"
              onClick={() => {
                setDeleteLink(false);
              }}
            >
              Cancel
            </button>
            <button
              className="p-2 bg-red-700 text-white rounded-md "
              onClick={() => {
                if (!loading) dispatch(deleteLinkCall(_id));
              }}
            >
              Delete link
            </button>
          </div>
        </div>
      </div>
    </RemoveScroll>,
    document.body
  );
}

export default DeleteLink;
