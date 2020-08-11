
const dummyNotifier = {
    error:()=>{},
    success:()=>{},
    info:()=>{},
    warning:()=>{},
};

const notifier={current:dummyNotifier};

export const notifierRef=notifier;
export const getNotifier = ()=>notifier.current;
