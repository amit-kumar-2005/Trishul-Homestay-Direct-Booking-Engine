import AppRoutes from "./routes/AppRoutes";
import AIChatWidget from "./components/ai/AIChatWidget";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
      <AIChatWidget />
    </ErrorBoundary>
  );
}

export default App;