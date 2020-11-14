// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { SafeAreaView, StyleSheet, Text } from "react-native";
// import LoginScreen from "./app/screens/LoginScreen";

// export default function App() {
//   return (
//     <SafeAreaView style={styles.constainer}>
//       {/* <LoginScreen></LoginScreen> */}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   constainer: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// // let exampleUsers: User[];
// // let jsonString: string =
// //   '[{"id":1,"firstName":"Andrew","lastName":"Pynch","age":18,"email":"","userName":""},{"id":2,"firstName":"Timber","lastName":"Saw","age":27,"email":"","userName":""},{"id":3,"firstName":"Phantom","lastName":"Assassin","age":24,"email":"","userName":""},{"id":4,"firstName":"Timber","lastName":"Saw","age":27,"email":"","userName":""},{"id":5,"firstName":"Phantom","lastName":"Assassin","age":24,"email":"","userName":""}]';

// // exampleUsers = JSON.parse(jsonString) as User[];
// // let singleUser: User = exampleUsers[0];
// // console.log(exampleUsers);

// //#region
// import { response } from "express";
// import React from "react";
// import {
//   SafeAreaView,
//   View,
//   FlatList,
//   StyleSheet,
//   Text,
//   StatusBar,
// } from "react-native";
// import { User } from "../models/Users";

// const GetUsersFromAPI = () => {
//   console.log("BEGINNING DATA READ");
//   return fetch("https://10.0.3.2:3000/users")
//     .then((response) => response.json())
//     .then((json) => {
//       console.log("FINISHING DATA READ");
//       return JSON.parse(json);
//     })
//     .catch((error) => {
//       console.log("ERROR MOTHER FUCKER");
//       console.error(error);
//     });
// };

// const Item = ({ renderItem }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{renderItem}</Text>
//   </View>
// );

// const LoginScreen = () => {
//   console.log(GetUsersFromAPI());
//   // const renderItem = ({ item }) => <Item renderItem={item.firstName} />;

//   // return (
//   //   <SafeAreaView style={styles.container}>
//   //     <FlatList
//   //       data={usersList}
//   //       renderItem={renderItem}
//   //       keyExtractor={(item) => item.id}
//   //     />
//   //   </SafeAreaView>
//   // );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default LoginScreen;

// //#endregion
