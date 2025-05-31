import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Chart } from "../chart/chart";

import { Loader } from "../components/Loader/Loader";
import { Config } from "../components/Config/Config";
import { Chat } from "../components/Chat/Chat";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Loader />
      <Config />
      <Chat />
      {/* <Chart />
      <Welcome /> */}
    </>);
}
