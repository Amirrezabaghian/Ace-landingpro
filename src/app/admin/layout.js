export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* اینجا دیگه خبری از هدر و فوتر سایت اصلی نیست */}
        {children}
      </body>
    </html>
  );
}