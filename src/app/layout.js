import './globals.css';

export const metadata = {
  title: 'AI Video Studio - 맞춤형 화장품 마케팅 영상 제작',
  description: 'AI 기반 퍼포먼스 마케팅 영상을 직접 제작하고 내보내는 올인원 도구',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
