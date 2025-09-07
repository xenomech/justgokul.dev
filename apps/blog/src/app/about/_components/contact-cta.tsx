import { USER_INFO } from '@/assets/store';
import { Button } from '@repo/ui';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function ContactCTA() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-12 text-center">
      <div className="mx-auto max-w-2xl space-y-6">
        <h3 className="text-3xl font-bold text-gray-900">
          Let&apos;s Build Something Amazing Together
        </h3>
        <p className="text-lg text-gray-600">
          Always open to interesting projects, collaborations, and tech conversations. Whether you
          need development work, want to discuss ideas, or just geek out about Linux and
          photography.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={USER_INFO.contactUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" rightIcon={<ExternalLink className="h-5 w-5" />}>
              Start a Conversation
            </Button>
          </Link>
          <Link href={`mailto:${USER_INFO.email}`}>
            <Button variant="navigator" size="lg">
              Send Email
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
