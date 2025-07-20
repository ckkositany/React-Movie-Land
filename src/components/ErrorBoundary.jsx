import React from "react";
import { logError } from "../utils/logger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update UI
  }

  componentDidCatch(error, errorInfo) {
    logError("UI Error", { error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h1>Something went wrong 😞</h1>
          <p>Try refreshing the page or contact support if the issue persists.</p>
          <button onClick={this.handleReload}>Reload</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
