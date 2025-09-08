import { ExternalLink } from 'lucide-react';
import { PUBLICATIONS, SOCIALS } from '@/assets/store';
import { TrackedLink } from '@/components/tracked-link';

export function SocialSection() {
  return (
    <section className="space-y-8 overflow-hidden">
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-gray-900">Let's connect!</h3>
        <p className="text-gray-600">You can find me here, sharing thoughts, design, and photos!</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Social Links */}
        <div className="min-w-0 space-y-6">
          <h4 className="text-xl font-semibold text-gray-900">Socials</h4>
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {SOCIALS.map(social => {
              const IconComponent = social.icon;
              return (
                <TrackedLink
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dash group flex min-w-0 items-center gap-4 overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
                  eventName="about_social_clicked"
                  eventProperties={{
                    location: 'about_social',
                    platform: social.name.toLowerCase(),
                  }}
                >
                  <div className="flex-shrink-0 rounded-lg bg-gray-50 p-2 transition-colors duration-200 group-hover:bg-gray-100">
                    <IconComponent className="h-5 w-5 text-gray-600 transition-colors duration-200 group-hover:text-gray-800" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
                      {social.name}
                    </div>
                    <div className="truncate text-sm text-gray-500">{social.username}</div>
                  </div>
                </TrackedLink>
              );
            })}
          </div>
        </div>

        {/* Publications */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-gray-900">Publications</h4>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub, index) => (
              <TrackedLink
                key={index}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="dash group block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                eventName="about_publication_clicked"
                eventProperties={{ location: 'about_social', publication_title: pub.title }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h5 className="line-clamp-2 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-gray-700">
                      {pub.title}
                    </h5>
                    <div className="text-sm text-gray-600">
                      Published in {pub.publishedIn.publisherLabel}
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 flex-shrink-0 text-gray-400 transition-colors duration-200 group-hover:text-gray-700" />
                </div>
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
