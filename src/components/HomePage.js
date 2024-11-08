import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Trophy, 
  History, 
  BarChart2,
  Flame,
  Clock,
  Calendar,
  TrendingUp
} from 'lucide-react';

function HomePage({ workouts = [] }) {
  // Calculate stats from workout history
  const totalWorkouts = workouts.length;
  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return workoutDate >= weekAgo;
  }).length;

  const latestStreak = workouts.reduce((streak, workout, index) => {
    if (index === 0) return 1;
    const currentDate = new Date(workout.date);
    const prevDate = new Date(workouts[index - 1].date);
    const dayDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);
    return dayDiff <= 1 ? streak + 1 : 1;
  }, 0);

  const totalMinutes = workouts.reduce((total, workout) => {
    return total + workout.exercises.reduce((exerciseTotal, exercise) => {
      return exerciseTotal + (exercise.duration || 0);
    }, 0);
  }, 0);

  const stats = [
    { 
      title: 'Total Workouts',
      value: totalWorkouts,
      icon: Flame,
      color: 'bg-rose-100 text-rose-500'
    },
    {
      title: 'This Week',
      value: thisWeekWorkouts,
      icon: Calendar,
      color: 'bg-sky-100 text-sky-500'
    },
    {
      title: 'Current Streak',
      value: `${latestStreak} days`,
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-500'
    },
    {
      title: 'Total Minutes',
      value: totalMinutes,
      icon: Clock,
      color: 'bg-violet-100 text-violet-500'
    }
  ];

  const quickActions = [
    { 
      title: 'Start Workout',
      description: 'Begin your fitness journey',
      icon: Dumbbell,
      to: '/select-location',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600'
    },
    {
      title: 'View Progress',
      description: 'Track your metrics',
      icon: BarChart2,
      to: '/progress',
      color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Workout History',
      description: 'Review past workouts',
      icon: History,
      to: '/history',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600'
    },
    {
      title: 'Achievements',
      description: 'Check your milestones',
      icon: Trophy,
      to: '/achievements',
      color: 'bg-amber-50 hover:bg-amber-100 text-amber-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`group flex items-start p-6 rounded-xl transition-all ${action.color}`}
          >
            <div className="flex-shrink-0">
              <action.icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-lg mb-1">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;