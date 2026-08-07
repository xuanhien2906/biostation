import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  // @ts-ignore
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    const instanceState = (this as any).state as State;
    const instanceProps = (this as any).props as Props;

    if (instanceState && instanceState.hasError) {
      return (
        <div className="min-h-screen bg-[#f8f5f0] text-[#2d241e] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-[#e2d5c3] p-8 shadow-2xl text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-amber-100 text-amber-800 shadow-sm">
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black font-serif text-[#274e23]">
                Đã Xảy Ra Lỗi Hiển Thị
              </h2>
              <p className="text-xs text-[#5c4d43] leading-relaxed">
                Hệ thống tạm thời không thể hiển thị nội dung này. Vui lòng thử tải lại trang hoặc quay về trang chủ.
              </p>
            </div>

            {instanceState.error && (
              <div className="p-3 bg-[#fbf8f3] rounded-xl border border-[#e2d5c3] text-left">
                <p className="text-[11px] font-mono text-red-600 break-words">
                  {instanceState.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 py-3 px-4 bg-[#274e23] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-[#1f381c] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Tải Lại Trang
              </button>
              <button
                onClick={() => {
                  (this as any).setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="py-3 px-4 bg-stone-100 text-[#5c4d43] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" /> Trang Chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return instanceProps.children;
  }
}
