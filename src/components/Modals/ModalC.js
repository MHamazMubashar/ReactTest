import React from "react";
import "./Modal.scss";

function ModalC(props) {
  const { selectedListItem, onClose } = props;
  return (
    <div className={`modal contactsModal`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal C</h5>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>

          <div className="modal-body ModalBody">
            <div>first name : {selectedListItem.first_name}</div>
            <div>last name : {selectedListItem.last_name}</div>
            <div>Phone No. : {selectedListItem.phone_number}</div>
            <div>email : {selectedListItem.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalC;
