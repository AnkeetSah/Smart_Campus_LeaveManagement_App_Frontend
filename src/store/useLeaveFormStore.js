import { create } from "zustand";

const useLeaveFormStore = create((set) => ({
  showForm: false,
  showLeaveFormHistory: false,
  showLeaveStatus: false,

  openForm: () =>
    set({ showForm: true, showLeaveFormHistory: false, showLeaveStatus: false }),
  closeForm: () => set({ showForm: false }),

  openLeaveHistoryForm: () =>
    set({ showForm: false, showLeaveFormHistory: true, showLeaveStatus: false }),
  closeLeaveHistoryForm: () => set({ showLeaveFormHistory: false }),

  openLeaveStatus: () =>
    set({ showForm: false, showLeaveFormHistory: false, showLeaveStatus: true }),
  closeLeaveStatus: () => set({ showLeaveStatus: false }),
}));

export default useLeaveFormStore;
