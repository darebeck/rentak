import lessonsJson from '../content/lessons.json';
import type { Lesson } from '@/types';

const lessons = lessonsJson as Lesson[];

/**
 * Which lesson Home shows as "in progress".
 *
 * This is a Phase 1 stand-in. Learning progress is *user state*, not content —
 * in Phase 2 it belongs in `data/store/`, and this function should take the
 * user's current lesson id as an argument instead of reading this constant.
 * The return shape stays the same, so `ContinueLearning` won't change.
 */
const IN_PROGRESS_LESSON_ID = 'wayang-kulit-3';

export type LessonProgress = {
  lesson: Lesson;
  /** 0–1, for ProgressBar. */
  progress: number;
};

export const lessonRepository = {
  /** Every lesson in a course, in teaching order. */
  listByCourse(courseId: string): Lesson[] {
    return lessons.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);
  },

  getById(id: string): Lesson | undefined {
    return lessons.find((l) => l.id === id);
  },

  /**
   * The lesson Home's "Continue learning" card resumes, plus how far through
   * the course it sits.
   *
   * Progress is derived (`order / totalInCourse`) rather than stored, so it can
   * never drift out of step with the lesson. Lesson 3 of 5 gives 0.6 — the 60%
   * bar in the design.
   */
  getInProgress(): LessonProgress | undefined {
    const lesson = lessons.find((l) => l.id === IN_PROGRESS_LESSON_ID);
    if (!lesson) return undefined;
    return { lesson, progress: lesson.order / lesson.totalInCourse };
  },
};