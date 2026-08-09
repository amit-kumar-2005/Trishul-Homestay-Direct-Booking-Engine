import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "React Error Boundary:",
      error,
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-5 py-10">
          <div className="w-full max-w-lg rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
              <span className="text-3xl">!</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Something went wrong
            </h1>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              We couldn't display this page correctly.
              Please try again or return to the home page.
            </p>

            {import.meta.env.DEV && this.state.error?.message && (
              <p className="mt-4 rounded-lg bg-slate-100 dark:bg-slate-800 p-3 text-left text-xs text-slate-600 dark:text-slate-300 break-words">
                {this.state.error.message}
              </p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReload}
                className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
              >
                Reload Page
              </button>

              <button
                type="button"
                onClick={this.handleGoHome}
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-3 font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Go to Home
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;