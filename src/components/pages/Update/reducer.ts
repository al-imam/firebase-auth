interface InitState {
  confirmPassword: string;
  currentPassword: string;
  editEmail: boolean;
  editPassword: boolean;
  email: string;
  error: null | string;
  loading: boolean;
  password: string;
  success: null | string;
}

export const initializerArg: InitState = {
  confirmPassword: "",
  currentPassword: "",
  editEmail: false,
  editPassword: true,
  email: "",
  error: null,
  loading: false,
  password: "",
  success: null,
};

interface ACTION {
  type:
    | "current-password"
    | "email"
    | "password"
    | "confirm-password"
    | "error"
    | "success"
    | "loading"
    | "edit-email"
    | "edit-password";
  payload: string | boolean | null;
}

export function reducer(state: InitState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
    case "current-password":
      return {
        ...state,
        currentPassword: payload as string,
      };

    case "email":
      return {
        ...state,
        email: payload as string,
      };

    case "password":
      return {
        ...state,
        password: payload as string,
      };

    case "confirm-password":
      return {
        ...state,
        confirmPassword: payload as string,
      };

    case "error":
      return {
        ...state,
        error: payload as string | null,
      };

    case "loading":
      return {
        ...state,
        loading: payload as boolean,
      };

    case "success":
      return {
        ...state,
        success: payload as string | null,
      };

    case "edit-email":
      return {
        ...state,
        editEmail: payload as boolean,
      };

    case "edit-password":
      return {
        ...state,
        editPassword: payload as boolean,
      };

    default:
      throw new Error("type don't exist ");
  }
}
