import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { copyByLang } from "@/content/copy";

const copy = copyByLang.sv;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: copy.title },
      { name: "description", content: copy.description },
    ],
  }),
  component: () => <HomePage lang="sv" />,
});
