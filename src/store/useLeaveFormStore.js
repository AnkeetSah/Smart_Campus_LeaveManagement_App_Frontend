import { create } from "zustand";

const useLeaveFormStore = create((set) => ({
  showForm: false,
  showLeaveFormHistory:false,
  openForm: () => set({ showForm: true }),
  closeForm: () => set({ showForm: false }),

  openLeaveHistoryForm:()=>set({showLeaveFormHistory:true}),
  closeLeaveHistoryForm:()=>set({showLeaveFormHistory:false})
}));

export default useLeaveFormStore;
