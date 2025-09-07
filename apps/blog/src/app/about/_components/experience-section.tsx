import { EXPERIENCE } from '@/assets/store';
import Image from 'next/image';

export function ExperienceSection() {
  return (
    <section className="space-y-4">
      <h2 className="flex text-xl font-semibold text-gray-900">
        <span className="ml-3">Experience</span>
      </h2>
      <div className="dash rounded-2xl border border-gray-100 bg-white p-2">
        <div className="space-y-4">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-all duration-200 ease-out hover:translate-x-1 ${index !== EXPERIENCE.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex gap-4 p-4">
                <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5">
                  {exp.logo ? (
                    <Image src={exp.logo} fill alt={exp.company} className="object-cover" />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-800">
                      <span className="text-xs font-bold text-white">
                        {exp.company.substring(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-auto flex-wrap gap-x-2">
                  <div className="w-full flex-none text-base font-semibold text-gray-900">
                    {exp.role}
                  </div>
                  <div className="w-full flex-none text-sm font-medium text-gray-600">
                    {exp.company}
                  </div>
                  <div className="mb-2 w-full flex-none text-sm text-gray-500">
                    {exp.location} • {exp.duration}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
