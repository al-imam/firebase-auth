interface InitState {
  email: string;
  password: string;
  confirmPassword: string;
  error: null | string;
}

export const initializerArg: InitState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
};

interface ACTION {
  type: "email" | "password" | "confirmPassword" | "error";
  payload: string;
}

export function reducer(state: InitState, action: ACTION) {
  const { type, payload } = action;

  switch (type) {
    case "email":
      return {
        ...state,
        email: payload,
      };

    case "password":
      return {
        ...state,
        password: payload,
      };

    case "confirmPassword":
      return {
        ...state,
        confirmPassword: payload,
      };

    case "error":
      return {
        ...state,
        error: payload,
      };

    default:
      throw new Error("type don't exist ");
  }
}
