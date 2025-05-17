import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../clients/query";
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const loginUser = async (email: string, password: string) => {
    const { data } = await loginMutation({
      variables: {
        input: { email, password },
      },
    });

    if (!data?.loginUser) {
      throw new Error("Error al iniciar sesión");
    }

    const { token, user } = data.loginUser;
    login(token, user);
    return { token, user };
  };

  return { loginUser };
};