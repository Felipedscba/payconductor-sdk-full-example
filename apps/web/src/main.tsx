import "@repo/ui";
import { createRoot } from "react-dom/client";
import { CheckoutPage } from "./pages/checkout/page";

function App() {
    return <CheckoutPage />;
}

createRoot(document.getElementById("app")!).render(<App />);
