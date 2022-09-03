import { useParams } from "@remix-run/react";

export default function DynamicChild() {
  const { someId } = useParams();
  return <div>I am dinamic child - {someId}</div>;
}
