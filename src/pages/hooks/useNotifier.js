
  
  function useNotifier() {
    const notificationContext = {}
  
    const notify = (options) => {
      notificationContext.show(options);
    };
    return notify;
  }
  
  export default useNotifier;
  