


import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyAqg5HrI_dS61CzAxLCWJ1uJme0WbL9b5Y",
  authDomain: "pusherer-877ad.firebaseapp.com",
  projectId: "pusherer-877ad",
  storageBucket: "pusherer-877ad.appspot.com",
  messagingSenderId: "112304843334",
  appId: "1:112304843334:web:c3e166536aecf27628b847",
  measurementId: "G-2CRV3Q8L2E"
};


initializeApp(firebaseConfig);
const messaging = getMessaging();


export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });




export const requestForToken =  async () => {
  return getToken(messaging, {
    vapidKey:
      "BEE5HWC93B39XHkcy02zRac2g8KesY_w-qVVDwSDoRk_QuHVDk0BYcIyUREE9C-1lReCnlgltP2n4IhCb4g0dts",
  })
    .then(async (currentToken) => {
      if (currentToken) {

        localStorage.setItem("vite_notificationToken", currentToken);
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        requestFirebaseNotificationPermission();
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () => 

  new Promise((resolve) => {
    
    onMessage(messaging, (payload) => {

      resolve(payload);
    });
  });


  
























