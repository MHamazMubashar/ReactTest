import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContactsAction } from "../../redux/actions/contactsAction";
import { createSelector } from "reselect";
import { Scrollbars } from "react-custom-scrollbars";
import "./Modal.scss";
import parseQueryString from "../../utils/parseQueryString";

let debounceTimer;

function Modal(props) {
  const {
    fetchContacts,
    apiLoader,
    setSelectedListItem,
    openModal,
    activeModal,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [evenChecked, setEvenChecked] = useState(false);
  const dispatch = useDispatch();

  const selectContacts = (state) => state.contactsReducer.contacts;
  const getFilteredContacts = createSelector([selectContacts], (contacts) => {
    if (evenChecked) {
      return contacts.filter((contact) => contact.id % 2 === 0);
    }
    return contacts;
  });
  const contacts = useSelector(getFilteredContacts);

  useEffect(() => {
    const queryString = window.location.search;
    const params = parseQueryString(queryString);

    setQueryParams(params);
    fetchContacts(params);

    return () => {
      dispatch(setContactsAction([]));
      clearTimeout(debounceTimer);
    };
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !apiLoader) {
      loadMoreContacts();
    }
  };

  const loadMoreContacts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchContacts({ ...queryParams, _page: currentPage + 1 });
  };

  const handleSearch = (query) => {
    const params = { ...queryParams, page: 1 };
    if (query) {
      params.query = query;
    }

    dispatch(setContactsAction([]));
    fetchContacts(params);
  };

  const handleInputChange = (e) => {
    const q = e.target.value.trim();
    setSearchQuery(e.target.value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleSearch(q);
    }, 1000); // Adjust the debounce delay as needed
  };

  const handleInputKeyDown = (e) => {
    const q = e.target.value.trim();
    if (e.key === "Enter") {
      clearTimeout(debounceTimer);
      handleSearch(q);
    }
  };

  const handleCheckBox = (e) => {
    const isChecked = e.target.checked;
    setEvenChecked(isChecked);
  };

  const handleListItemClick = (contact) => {
    setSelectedListItem(contact);
    openModal("C");
  };
  return (
    <div className={`modal contactsModal`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Modal ${activeModal}`}</h5>
            <button
              type="button"
              className="buttonA btn btn-primary"
              onClick={() => props.openModal("A")}
            >
              All contacts
            </button>
            <button
              type="button"
              className="btn btn-primary buttonB"
              onClick={() => props.openModal("B")}
            >
              US Contacts
            </button>
            <button
              type="button"
              className="btn btn-primary USContactsButton"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search Contacts"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          </div>
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={250}
            autoHeightMax={250}
            onScroll={handleScroll}
          >
            <ul>
              {contacts.map((contact, i) => {
                return (
                  <li key={i} onClick={() => handleListItemClick(contact)}>
                 <span className="liText" >   {contact.first_name} {contact.last_name}</span>
                  </li>
                );
              })}
            </ul>
            {apiLoader && <div>Loading...</div>}
          </Scrollbars>
          <div className="modal-footer footer">
            <label>
              <input type="checkbox" onChange={handleCheckBox} />
              Only Even
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
