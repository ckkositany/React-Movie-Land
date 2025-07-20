import React from "react";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import ReactDOM from "react-dom/client"; // ✅ use 'react-dom/client'
import App from "./App"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
<QueryClientProvider client={queryClient} ><App />
</QueryClientProvider>
);
