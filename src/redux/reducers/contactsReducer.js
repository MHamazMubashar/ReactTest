import {
  SET_CONTACTS,
  APPEND_CONTACTS,
  FILTER_EVEN_CONTACTS,
  SET_EVEN_CONTACTS,
} from "../actions/contactsAction";

const initialState = {
  contacts: [],
  EvenContacts: [],
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case APPEND_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload],
      };

    case SET_EVEN_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };

    case FILTER_EVEN_CONTACTS:
      const newState = action.payload.map((contact) => {
        if (contact.id % 2 === 0) return contact;
      });
      return {
        ...state,
        isEvenContacts: newState,
      };

    default:
      return state;
  }
};

export default contactsReducer;
