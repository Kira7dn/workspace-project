import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "~/api/queries";

export default function Test() {
  const { loading, error, data } = useQuery(GET_FRIENDS);

  if (loading) return <p>Something Went Wrong</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {console.log(data)};<span>Hello world</span>
    </>
  );
}
