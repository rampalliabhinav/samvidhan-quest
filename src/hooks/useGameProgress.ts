import { useState, useEffect, useCallback } from 'react';
import badgesData from '@/data/badges.json';

export interface GameProgress {
  totalPoints: number;
  scenariosCompleted: number;
  swipesCompleted: number;
  casesCompleted: number;
  correctAnswers: number;
  currentStreak: number;
  maxStreak: number;
  judgePoints: number;
  topicsExplored: string[];
  earnedBadges: string[];
  lastPlayed: string;
}

const defaultProgress: GameProgress = {
  totalPoints: 0,
  scenariosCompleted: 0,
  swipesCompleted: 0,
  casesCompleted: 0,
  correctAnswers: 0,
  currentStreak: 0,
  maxStreak: 0,
  judgePoints: 0,
  topicsExplored: [],
  earnedBadges: [],
  lastPlayed: new Date().toISOString(),
};

const STORAGE_KEY = 'samvidhan-quest-progress';

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {
        setProgress(defaultProgress);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const checkAndAwardBadges = useCallback(() => {
    setProgress((prev) => {
      const newBadges: string[] = [];
      
      badgesData.badges.forEach((badge) => {
        if (prev.earnedBadges.includes(badge.id)) return;
        
        const req = badge.requirement;
        let earned = false;
        
        switch (req.type) {
          case 'scenarios':
            earned = prev.scenariosCompleted >= req.count;
            break;
          case 'swipes':
            earned = prev.swipesCompleted >= req.count;
            break;
          case 'cases':
            earned = prev.casesCompleted >= req.count;
            break;
          case 'topics':
            earned = prev.topicsExplored.length >= req.count;
            break;
          case 'streak':
            earned = prev.maxStreak >= req.count;
            break;
          case 'judgePoints':
            earned = prev.judgePoints >= req.count;
            break;
        }
        
        if (earned) {
          newBadges.push(badge.id);
        }
      });
      
      if (newBadges.length === 0) return prev;
      
      return {
        ...prev,
        earnedBadges: [...prev.earnedBadges, ...newBadges],
        totalPoints: prev.totalPoints + (newBadges.length * 100),
        lastPlayed: new Date().toISOString(),
      };
    });
  }, []);

  const updateProgress = (updates: Partial<GameProgress>) => {
    setProgress((prev) => ({
      ...prev,
      ...updates,
      lastPlayed: new Date().toISOString(),
    }));
  };

  const addPoints = (points: number) => {
    setProgress((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      lastPlayed: new Date().toISOString(),
    }));
  };

  const completeScenario = (correct: boolean) => {
    setProgress((prev) => ({
      ...prev,
      scenariosCompleted: prev.scenariosCompleted + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalPoints: correct ? prev.totalPoints + 50 : prev.totalPoints,
      currentStreak: correct ? prev.currentStreak + 1 : 0,
      maxStreak: correct ? Math.max(prev.maxStreak, prev.currentStreak + 1) : prev.maxStreak,
      lastPlayed: new Date().toISOString(),
    }));
  };

  const completeSwipe = (correct: boolean) => {
    setProgress((prev) => ({
      ...prev,
      swipesCompleted: prev.swipesCompleted + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalPoints: correct ? prev.totalPoints + 30 : prev.totalPoints,
      currentStreak: correct ? prev.currentStreak + 1 : 0,
      maxStreak: correct ? Math.max(prev.maxStreak, prev.currentStreak + 1) : prev.maxStreak,
      lastPlayed: new Date().toISOString(),
    }));
  };

  const completeCase = (correct: boolean, points: number) => {
    setProgress((prev) => ({
      ...prev,
      casesCompleted: prev.casesCompleted + 1,
      correctAnswers: correct ? prev.correctAnswers + 1 : prev.correctAnswers,
      totalPoints: correct ? prev.totalPoints + points : prev.totalPoints,
      judgePoints: correct ? prev.judgePoints + points : prev.judgePoints,
      lastPlayed: new Date().toISOString(),
    }));
  };

  const exploreTopic = (topicId: string) => {
    setProgress((prev) => {
      if (prev.topicsExplored.includes(topicId)) return prev;
      return {
        ...prev,
        topicsExplored: [...prev.topicsExplored, topicId],
        totalPoints: prev.totalPoints + 20,
        lastPlayed: new Date().toISOString(),
      };
    });
  };

  const earnBadge = (badgeId: string) => {
    setProgress((prev) => {
      if (prev.earnedBadges.includes(badgeId)) return prev;
      return {
        ...prev,
        earnedBadges: [...prev.earnedBadges, badgeId],
        totalPoints: prev.totalPoints + 100,
        lastPlayed: new Date().toISOString(),
      };
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getCurrentLevel = () => {
    const points = progress.totalPoints;
    if (points >= 1000) return { id: 4, name: 'Samvidhan Master', icon: 'Crown' };
    if (points >= 500) return { id: 3, name: 'Constitution Guardian', icon: 'Shield' };
    if (points >= 200) return { id: 2, name: 'Aware Citizen', icon: 'Eye' };
    return { id: 1, name: 'Citizen', icon: 'User' };
  };

  const getNextLevelProgress = () => {
    const points = progress.totalPoints;
    if (points >= 1000) return { current: points, target: 1000, percentage: 100 };
    if (points >= 500) return { current: points - 500, target: 500, percentage: ((points - 500) / 500) * 100 };
    if (points >= 200) return { current: points - 200, target: 300, percentage: ((points - 200) / 300) * 100 };
    return { current: points, target: 200, percentage: (points / 200) * 100 };
  };

  return {
    progress,
    isLoaded,
    updateProgress,
    addPoints,
    completeScenario,
    completeSwipe,
    completeCase,
    exploreTopic,
    earnBadge,
    checkAndAwardBadges,
    resetProgress,
    getCurrentLevel,
    getNextLevelProgress,
  };
}
