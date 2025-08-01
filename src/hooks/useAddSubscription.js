import { useMutation } from "@tanstack/react-query";
import { addSubscription } from "../services/notificationService";

const useAddSubscription=  ()=>{
    return useMutation({
        mutationFn:addSubscription,
    })
}

export default useAddSubscription