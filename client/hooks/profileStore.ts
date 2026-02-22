import { TProfile } from "@/lib/profile.type";
import { create } from "zustand";

type ProfileStore = {
  profile: TProfile | null;
  setProfile: (profile: TProfile | null) => void;
};

const useProfile = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile: TProfile | null) => set({ profile }),
}));

export default useProfile;
