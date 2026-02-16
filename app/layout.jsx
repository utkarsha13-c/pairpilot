// /app/layout.jsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* Optional header */}
        <header style={{ padding: "10px 20px", backgroundColor: "#1e293b", color: "#fff" }}>
          <h1>My App</h1>
        </header>

        {/* Main content */}
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
