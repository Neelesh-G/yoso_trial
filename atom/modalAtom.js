import { atom } from "recoil";
export const modalState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });


  export const modalState_email = atom({
    key: 'modalState_email', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

  export const postIdState = atom({
    key: 'postIdState', // unique ID (with respect to other atoms/selectors)
    default: "id", // default value (aka initial value)
  });

  export const projectIdState = atom({
    key: 'projectIdState', // unique ID (with respect to other atoms/selectors)
    default: "id", // default value (aka initial value)
  });

  export const postsState = atom({
    key: 'postsState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });