import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { getAuthenticatedUser, getUserData } from "../services/authentication/authServices";
import { SIGNUP } from "../../shared/constants/SIGNUP";
import type { User } from "../types/User";

export const useInitializeUser = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const authUser = await getAuthenticatedUser();

      if (authUser === SIGNUP.UNAUTHENTICATED) {
        navigate("/signup");
        return;
      }

      // If store already has a User, skip initialization
      if (user && typeof user !== "string") {
        setLoading(false);
        return;
      }

      let currentUser: User | string | null = user;

      // Fallback to Firestore
      if (!currentUser) {
        currentUser = (await getUserData()) as User;
      }

      // Update store
      setUser(currentUser);

      setLoading(false);
    };

    initUser();
  }, [navigate, setUser]);

  return { user, loading };
};
