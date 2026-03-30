import "@repo/ui";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { CheckoutPage } from "./pages/checkout/page";
import { TokenizePage } from "./pages/tokenize/page";

function App() {
	const path = window.location.pathname;

	if (path === "/tokenize") {
		return <TokenizePage />;
	}

	return <CheckoutPage />;
}

createRoot(document.getElementById("app")!).render(<App />);
