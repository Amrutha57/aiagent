export default function Footer() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} AI ChatApp. Powered by FastAPI + Gemini AI.</p>
    </footer>
  );
}
