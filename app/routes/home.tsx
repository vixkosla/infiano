import type { Route } from "./+types/home";

import { Loader } from "../components/Loader/Loader";
import { Config } from "../components/Config/Config";
import { Chat } from "../components/Chat/Chat";

import { useGlobalStore } from "~/store/useGlobalStore";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Infiano" },
    { name: "...", content: "Welcome to the better world!" },
  ];
}

export default function Home() {

  return (
    <>
      <Loader />
      <Config />
      <Chat />
    </>);
}
