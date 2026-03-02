export interface UserObject {
  user_id: number;
  username: string;
  full_name?: string;
  first_login: boolean;
  role: string;
  access_token: string;
  app_token: string;
  refresh_token: string;
}

export type AppState = {
  loading: boolean;
  user: UserObject;
};

export type AppStore = AppState & {
  setLoading: (value: boolean) => void;
  setUser: (data: UserObject) => void;
};
