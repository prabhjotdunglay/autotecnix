import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    // Smooth cross-fades between pages in browsers that support the View Transitions API.
    defaultViewTransition: true,
  });

  return router;
};
