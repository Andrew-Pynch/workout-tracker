import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, Style } from "react-native";
import { User } from "../models/Users";

function LoginScreen() {
  console.log("BEGIN JSON READ");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  let exampleUsers: User[];
  let jsonString: string =
    '[{"id":1,"firstName":"Andrew","lastName":"Pynch","age":18,"email":"","userName":""},{"id":2,"firstName":"Timber","lastName":"Saw","age":27,"email":"","userName":""},{"id":3,"firstName":"Phantom","lastName":"Assassin","age":24,"email":"","userName":""},{"id":4,"firstName":"Timber","lastName":"Saw","age":27,"email":"","userName":""},{"id":5,"firstName":"Phantom","lastName":"Assassin","age":24,"email":"","userName":""}]';

  exampleUsers = JSON.parse(jsonString) as User[];
  let singleUser: User = exampleUsers[0];
  console.log(exampleUsers);

  // useEffect(() => {
  //   fetch("https://10.0.3.2:3000/users")
  //     .then((response) => response.json())
  //     .then((json) => setData(json.User))
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text>Hello There</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
