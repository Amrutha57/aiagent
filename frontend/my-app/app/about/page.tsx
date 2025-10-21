import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This chat application demonstrates a full-stack AI integration using Next.js 15 (frontend) and FastAPI (backend).
          </p>
          <p>
            The AI agent communicates with the Gemini API for real-time intelligent responses. 
            The UI is crafted using shadcn/ui for a clean and elegant interface.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
