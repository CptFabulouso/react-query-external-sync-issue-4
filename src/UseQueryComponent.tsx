import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

export default function UseQueryComponent() {
  useQuery({
    queryKey: ['todos', '1'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { title: 'todo 1' };
    },
  })
  
  return <Text>Component with useQuery hook mounted</Text>
}