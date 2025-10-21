import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh]">
      <Card className="max-w-xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Welcome to AI ChatApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Chat with an intelligent AI powered by Google Gemini and FastAPI backend — built with Next.js 15 and shadcn/ui.
          </p>
          <Button asChild size="lg">
            <Link href="/chat">Start Chatting</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
