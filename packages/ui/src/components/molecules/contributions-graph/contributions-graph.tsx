'use client';

import { dateToTimestamp, getDayOfWeek } from '@repo/utils';
import { ContributionsGraphProps, ContributionDay } from './types';

interface ContributionSquareProps {
  day: ContributionDay;
  theme: 'light' | 'dark' | 'github';
}

const ContributionSquare = ({ day, theme }: ContributionSquareProps) => {
  const getSquareColor = () => {
    const level = Math.min(Math.max(day.level, 0), 4);

    if (level === 0) {
      return theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    }

    if (theme === 'github' || theme === 'light') {
      const colors = [
        'bg-gray-100',
        'bg-green-200',
        'bg-green-400',
        'bg-green-600',
        'bg-green-800',
      ];
      return colors[level];
    }

    const colors = [
      'bg-gray-800',
      'bg-green-800/50',
      'bg-green-700/70',
      'bg-green-600',
      'bg-green-500',
    ];
    return colors[level];
  };

  return (
    <div
      className={`h-2.5 w-2.5 rounded-sm ${getSquareColor()} border border-white/10 transition-all duration-200 ease-out hover:scale-110`}
    />
  );
};

export const ContributionsGraph = ({
  data,
  username,
  className = '',
  showStats = true,
  theme = 'light',
}: ContributionsGraphProps) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const groupByMonth = () => {
    const monthGroups: { [key: string]: ContributionDay[] } = {};

    data.weeks.forEach(week => {
      week.days.forEach(day => {
        const date = new Date(day.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;

        if (!monthGroups[monthKey]) {
          monthGroups[monthKey] = [];
        }
        monthGroups[monthKey].push(day);
      });
    });

    return Object.entries(monthGroups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthKey, days]) => {
        const firstDay = days[0];
        if (!firstDay) return null;

        const date = new Date(firstDay.date);
        const monthIndex = date.getMonth();

        return {
          monthKey,
          month: monthNames[monthIndex] || 'Unknown',
          year: date.getFullYear(),
          days: days.sort((a, b) => dateToTimestamp(a.date) - dateToTimestamp(b.date)),
        };
      })
      .filter((month): month is NonNullable<typeof month> => month !== null);
  };

  const calculateStreaks = () => {
    const allDays = data.weeks
      .flatMap(week => week.days)
      .sort((a, b) => dateToTimestamp(b.date) - dateToTimestamp(a.date));

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    for (const day of allDays) {
      if (day.count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    const sortedDays = [...allDays].reverse();
    for (const day of sortedDays) {
      if (day.count > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    return { currentStreak, longestStreak };
  };

  const organizeMonthIntoWeeks = (days: ContributionDay[]) => {
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    days.forEach(day => {
      const dayOfWeek = getDayOfWeek(day.date);

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentWeek.push(day);
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const filterPastAndCurrentMonths = (monthData: ReturnType<typeof groupByMonth>) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return monthData.filter(month => {
      const monthIndex = monthNames.indexOf(month.month);
      const monthDate = new Date(month.year, monthIndex);
      const currentDate = new Date(currentYear, currentMonth);

      return monthDate <= currentDate;
    });
  };

  const monthlyData = filterPastAndCurrentMonths(groupByMonth());

  return (
    <div className={`${className} space-y-8`}>
      {showStats && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {data.totalContributions.toLocaleString()} contributions in the last year
            </h3>
            {username && (
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                @{username} on GitHub
              </p>
            )}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {monthlyData.map(monthData => {
            const weeks = organizeMonthIntoWeeks(monthData.days);

            return (
              <div key={monthData.monthKey} className="flex flex-col gap-2">
                <div className="text-center">
                  <h4
                    className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  >
                    {monthData.month}
                  </h4>
                </div>

                <div className="flex gap-0.5">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-0.5">
                      {week.map((day, dayIndex) => (
                        <ContributionSquare
                          key={`${monthData.monthKey}-${weekIndex}-${dayIndex}`}
                          day={day}
                          theme={theme}
                        />
                      ))}
                      {Array.from({ length: 7 - week.length }).map((_, emptyIndex) => (
                        <div key={`empty-${emptyIndex}`} className="h-2.5 w-2.5" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-4 text-sm">
        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Less</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <ContributionSquare
                key={level}
                day={{
                  date: '',
                  count: level > 0 ? 1 : 0,
                  level,
                }}
                theme={theme}
              />
            ))}
          </div>
          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>More</span>
        </div>
      </div>
    </div>
  );
};
