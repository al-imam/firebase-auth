interface InitState {
  email: string;
  password: string;
  confirmPassword: string;
  error: null | string;
  loading: boolean;
}

export const initializerArg: InitState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
  loading: false,
};

interface ACTION {
  type: "email" | "password" | "confirmPassword" | "error" | "loading";
  payload: string | null | boolean;
}

export function reducer(state: InitState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
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

    case "confirmPassword":
      return {
        ...state,
        confirmPassword: payload as string,
      };

    case "error":
      return {
        ...state,
        error: payload as null | string,
      };

    case "loading":
      return {
        ...state,
        loading: payload as boolean,
      };

    default:
      throw new Error("type don't exist ");
  }
}
