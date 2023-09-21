// Action Types

export const SET_CONTACTS = "SET_CONTACTS";
export const APPEND_CONTACTS = "APPEND_CONTACTS";
export const FILTER_EVEN_CONTACTS = "FILTER_EVEN_CONTACTS";
export const SET_EVEN_CONTACTS = "SET_EVEN_CONTACTS";

// Action Creators
export const setContactsAction = (payload) => ({
  type: SET_CONTACTS,
  payload,
});

export const appendContactsAction = (payload) => ({
  type: APPEND_CONTACTS,
  payload,
});

export const filterEvenContacts = (payload) => ({
  type: FILTER_EVEN_CONTACTS,
  payload,
});

export const setEvenContacts = (payload) => ({
  type: SET_EVEN_CONTACTS,
  payload,
});
