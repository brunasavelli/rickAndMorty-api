import "./globals.css";

export const metadata = {
  title: "My First Next.js App",
  description: "Meu primeiro consumo de API grátis",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}