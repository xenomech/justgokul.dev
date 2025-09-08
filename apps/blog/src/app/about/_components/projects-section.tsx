import { PROJECTS } from '@/assets/store';
import { GitHubContributionsSection } from './gh-section';
import { Chips } from '@repo/ui';
import { TrackedLink } from '@/components/tracked-link';

export function ProjectsSection() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-gray-900">Code, Code, Code!</h3>
        <p className="text-gray-600">Some of the stuffs I made when I got some spare time.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-semibold text-gray-900">Projects</h4>
          </div>
          <div className="dash rounded-xl border bg-white">
            <div className="flex h-fit w-full flex-wrap gap-6 p-6">
              {PROJECTS.map(item => (
                <TrackedLink
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="about_project_clicked"
                  eventProperties={{ location: 'about_projects', project_name: item.title }}
                >
                  <Chips text={item.title} showExternalIcon={true} />
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Contributions */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-semibold text-gray-900">GitHub Activity</h4>
          </div>
          <div className="dash rounded-xl border border-gray-100 bg-white p-6">
            <GitHubContributionsSection username="xenomech" />
          </div>
        </div>
      </div>
    </section>
  );
}
