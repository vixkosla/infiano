import type { Route } from "./+types/home";

import { Loader } from "../components/Loader/Loader";
import { Config } from "../components/Config/Config";
import { Chat } from "../components/Chat/Chat";

import { useGlobalStore } from "~/store/useGlobalStore";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { isOptimized } = useGlobalStore();
  console.log('isOptimized', isOptimized);

  return (
    <>
      <Loader />
      { isOptimized && <Config />}
      { isOptimized && <Chat /> }
    </>);
}
