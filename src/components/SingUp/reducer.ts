interface InitState {
  email: string;
  password: string;
  confirmPassword: string;
}

export const initializerArg: InitState = {
  email: "",
  password: "",
  confirmPassword: "",
};

interface ACTION {
  type: "email" | "password" | "confirmPassword";
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

    default:
      throw new Error("type don't exist ");
  }
}
