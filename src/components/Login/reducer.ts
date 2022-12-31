interface InitState {
  email: string;
  error: null | string;
  loading: boolean;
  password: string;
}

export const initializerArg: InitState = {
  email: "",
  error: null,
  loading: false,
  password: "",
};

interface ACTION {
  type: "email" | "password" | "error" | "loading";
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

    case "error":
      return {
        ...state,
        error: payload.length === 0 ? null : payload,
      };

    case "loading":
      return {
        ...state,
        loading: Boolean(payload),
      };

    default:
      throw new Error("type don't exist ");
  }
}
