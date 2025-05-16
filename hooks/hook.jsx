import { useEffect, useState } from "react"
import toast from "react-hot-toast"




const useErrors = (errors = []) => {
    
    useEffect(() => { 

        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else toast.error(error?.data?.message || "something went wrong")
            }
            
        }
        )
    }, [errors])
      
}

const useAsyncMutation = (mutationHOOK) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
  
    const [mutate] = mutationHOOK();
  
    const executemutation = async (toastMessage, args = {}) => {
      setIsLoading(true);
      const toastId = toast.loading(toastMessage || "Updating...");
  
      try {
        const res = await mutate(args);
  
        if (res.data) {
          toast.success(res.data.message || "Success", { id: toastId });
          setData(res.data);
        } else {
          toast.error(res.error?.data?.message || "Something went wrong", { id: toastId });
        }
      } catch (error) {
        console.error(error);
        toast.error("Error sending friend request", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    };
  
    return [isLoading, executemutation, data];
};
  

const useSocketEvent = (socket, events = {}) => {
  useEffect(() => {
    if (!socket) return;

    for (const [event, handler] of Object.entries(events)) {
      socket.on(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(events)) {
        socket.off(event, handler);
      }
    };
  }, [socket, events]);
};



export default useErrors;
export { useAsyncMutation, useSocketEvent};