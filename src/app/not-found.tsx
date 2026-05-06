import Link from 'next/link';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Search, Zap } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 border border-primary/50">
                        <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="font-heading font-bold text-6xl md:text-8xl gradient-text">404</h1>
                    <h2 className="font-heading font-semibold text-2xl md:text-3xl">Page Not Found</h2>
                    <p className="text-muted text-lg max-w-md mx-auto">
                        The page you are looking for does not exist or has been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <Button size="lg"><ArrowLeft className="w-5 h-5 mr-2" /> Back to Home</Button>
                        </Link>
                        <Link href="/markets">
                            <Button variant="outline" size="lg"><Search className="w-5 h-5 mr-2" /> Browse Markets</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
