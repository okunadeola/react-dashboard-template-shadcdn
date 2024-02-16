/* eslint-disable no-undef */


// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");



// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAqg5HrI_dS61CzAxLCWJ1uJme0WbL9b5Y",
  authDomain: "pusherer-877ad.firebaseapp.com",
  projectId: "pusherer-877ad",
  storageBucket: "pusherer-877ad.appspot.com",
  messagingSenderId: "112304843334",
  appId: "1:112304843334:web:c3e166536aecf27628b847",
  measurementId: "G-2CRV3Q8L2E"
};


firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  /* eslint-disable */
  self.registration.showNotification(notificationTitle, notificationOptions);
});























































// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging-compat.js');



// // const firebaseConfig = {
// //   apiKey: "AIzaSyC9UHpFYfDtlpGLMlg41mp-RbDkJy2_9ng",
// //   authDomain: "eco-notification-9f105.firebaseapp.com",
// //   projectId: "eco-notification-9f105",
// //   storageBucket: "eco-notification-9f105.appspot.com",
// //   messagingSenderId: "1082343226923",
// //   appId: "1:1082343226923:web:e69a926fa190b6b6da346e"
// // };

// const firebaseConfig = {

//   apiKey: "AIzaSyB9LdImyoZCTMQYEb2Op_WwFvIR8mgJgSg",

//   authDomain: "ecotfx-7a412.firebaseapp.com",

//   projectId: "ecotfx-7a412",

//   storageBucket: "ecotfx-7a412.appspot.com",

//   messagingSenderId: "479890018643",

//   appId: "1:479890018643:web:f307df6184f40c49f7d1a6",

//   measurementId: "G-F0VHTLBB8K"

// };



// firebase.initializeApp(firebaseConfig);

// // let messaging = firebase.messageing();

// // messaging.onBackgroundMessage(function(payload) {
// //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //   const notificationTitle = payload.notification.title;
// //   const notificationOptions = {
// //     body: payload.notification.body,

// //   };

// //   self.registration.showNotification(notificationTitle,
// //     notificationOptions);
// // });


// // Retrieve firebase messaging
// const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };
//      /* eslint-disable */
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // onBackgroundMessage(messaging, (payload) => {
// //   console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //   // Customize notification here
// //   const notificationTitle = 'Background Message Title';
// //   const notificationOptions = {
// //     body: 'Background Message body.',
// //     icon: '/firebase-logo.png'
// //   };
// //      /* eslint-disable */
// //   self.registration.showNotification(notificationTitle,
// //     notificationOptions);
// // });


// messaging.onMessage(function (payload) {
//   console.log("Received foreground message ", payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };
//      /* eslint-disable */
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });