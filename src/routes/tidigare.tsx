import { createFileRoute } from "@tanstack/react-router";
import { EditorialPage } from "@/components/home-editorial";

export const Route = createFileRoute("/tidigare")({
  head: () => ({
    meta: [{ title: "Creacom — tidigare utkast" }],
  }),
  component: () => <EditorialPage lang="sv" />,
});
