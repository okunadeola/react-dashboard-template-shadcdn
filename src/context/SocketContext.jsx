/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useState,  useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

//const URL = 'http://localhost:8080' // process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

// http://localhost:4000



// const socket = io("https://clancomsocket.vercel.app/", {
//   autoConnect: false,

// });

const socket = io("https://lendnode.creditclan.com/communeety/", {
  autoConnect: false,
});


// const socket = io("http://localhost:4000", {
//   autoConnect: false,
// });

// const socket = io('https://warm-wildwood-81069.herokuapp.com');

const SocketContextProvider = ({ children }) => {
  const [allChat, setAllChat] = useState([]);
  const [typingObj, setTypingObj] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allChatHistory, setAllChatHistory] = useState([]);
  const [allChatHistoryFilter, setAllChatHistoryFilter] = useState([]);
  const [shouldScroll, setShouldScroll] = useState(false);

  const [currentPickedChat, setCurrentPickedChat] = useState(null)


// console.log(currentPickedChat)


  const setChat = (data) => {
    setAllChat([...data]);
  };

  const setMoreChat = (data) => {
    const incoming = [...data, ...allChat]
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
              if (!uniqueIds.has(obj.CHAT_ID)) {
                uniqueIds.add(obj.CHAT_ID);
                return true;
              }
              return false;
            });

    setAllChat([...uniqueArray]);
  };

  const addChat = (data) => {
    setAllChat([...allChat, data]);
  };

  const clearChat = () => {
    setAllChat([]);
  };

  const setChatHistory = (data) => {
    setAllChatHistory([...data]);
  };

  const setChatHistoryFilter = (data) => {
    setAllChatHistoryFilter([...data]);
  };



  const reArrangeChatHistory = (chatuser) => {
      if (allChatHistoryFilter.length  === 0) {
        let values = [...allChatHistory];
        const index = values.findIndex(
          (data) => data?.STAFF_ID === chatuser?.STAFF_ID
        );

        // console.log('here', index, chatuser, values)
        if(index === 0) return
        
        // console.log('there', index)
        if (index !== -1) {
          const element = values.splice(index, 1)[0];
          // console.log('here', element)
          values.splice(0, 0, element);
          // console.log(element, values);
          setAllChatHistory([...values]);
        }
        
      }else{


        let valuesFilter = [...allChatHistoryFilter];
          const indexFilter = valuesFilter.findIndex(
            (data) => data?.STAFF_ID === chatuser?.STAFF_ID
          );

          if(indexFilter !== 0 && indexFilter !== -1) {

              const elementFilter = valuesFilter?.splice(indexFilter, 1)[0];
              // console.log(elementFilter, valuesFilter);
              valuesFilter.splice(0, 0, elementFilter);
              setAllChatHistoryFilter([...valuesFilter]);

          }



          let values2 = [...allChatHistory];
          const index2 = values2.findIndex(
            (data) => data?.STAFF_ID === chatuser?.STAFF_ID
          );
  
          if(index2 === 0) return
          
      
          if (index2 !== -1) {
            const element2 = values2.splice(index2, 1)[0];
            values2.splice(0, 0, element2);
            // console.log(element2, values2);
            setAllChatHistory([...values2]);
          }else{
            values2.splice(0, 0, chatuser);
            // console.log(values2);
            setAllChatHistory([...values2]);
          }
      }



  };




// =====================================socket==================================

  useEffect(() => {
    // console.log(socket)
    function onConnect() {
      // console.log(socket);
      const userId = 23

      socket.emit('addUser', userId)
      //   console.timeLog(socket.id)
    }

    function onDisconnect() {
      // console.timeLog("disconnected");
    }
   
    socket.connect()
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);




  const incomingOnlineUser = (users)=>{
    console.log(users)
    setOnlineUsers([...users])

  }
  
  
  
  const incomingMessage = (msg)=>{
    // console.log(msg, currentPickedChat)

    if(currentPickedChat?.STAFF_ID === msg?.messageObj?.SENDER_ID ){
      setAllChat([...allChat, msg.messageObj])
      setShouldScroll(true)
      removeTyping()
    }
  }


  const incomingTypingSignal = (data)=>{
    // console.log('typing', data?.senderId)

    if(currentPickedChat?.STAFF_ID === data?.senderId ){
      setTypingObj(data?.senderId)

     setTimeout(() => { removeTyping() }, 5000);
    }

  }
  

  const removeTyping = ()=>{
    setTypingObj(null)
  }
  
  
  const sendMessage = (msg)=>{
    // console.log(msg)
    socket.emit('sendMessage', {senderId: msg?.SENDER_ID,  receiverId:  msg?.RECEIVER_ID,     messageObj: msg})

    // socket.emit('sendMessage', {senderId: msg?.SENDER_ID,  receiverId:  msg?.SENDER_ID,     messageObj: msg})
  }
  


  const sendTypingSignal = (typingObj)=>{
    // console.log(typingObj)

    socket.emit('sendTyping', {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,})

    // socket.emit('sendTyping', {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.SENDER_ID,})
    
    // clearTimeout(timeout);
    // var timeout = setTimeout(() => { socket.emit('stopTyping', {senderId: typingObj?.SENDER_ID,  receiverId: typingObj?.RECEIVER_ID,}); }, 1000);

  }
  
  
  useEffect(() => {
  
    socket.on('getUsers', (incoming) => incomingOnlineUser(incoming));
    socket.on('getMessage', (incomingMsg) => incomingMessage(incomingMsg));
    socket.on('getTyping', (incomingID) => incomingTypingSignal(incomingID));
  
  }, [allChat,currentPickedChat, onlineUsers]);



  // function to handle when a user or socket is typing
  // const handleUserTyping = () => {
  //   clearTimeout(timeout);
  //   socket.emit('userTyping', socket.id, 'start');
  //   var timeout = setTimeout(() => { socket.emit('userTyping', socket.id, 'stop'); }, 1000);
  // };

   // scroll to bottom page function when message is sent
    //  const scrollToBottom = () => {
    //   window.scroll({
    //     top: document.body.offsetHeight, left: 0, behavior: 'smooth',
    //   });
    // };

  

// =====================================socket==================================




























  return (
    <SocketContext.Provider
      value={{
        setAllChat,
        allChat,
        setChat,
        addChat,
        clearChat,
        shouldScroll,
        setShouldScroll,
        allChatHistory,
        setChatHistory,
        reArrangeChatHistory,
        setMoreChat,
        setChatHistoryFilter,
        allChatHistoryFilter,
        sendMessage,
        sendTypingSignal,
        onlineUsers,
        typingObj,
        setCurrentPickedChat,
        currentPickedChat
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider, SocketContext };
