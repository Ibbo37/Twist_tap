import { useState } from "react";
import { LessonList } from "./LessonList";
import { VideoPlayer } from "./VideoPlayer";
import { danceStyles } from "./dance";


export default function TutorialSection() {
  const [selectedStyle, setSelectedStyle] = useState("Ballet");
  const [lessons, setLessons] = useState(danceStyles[selectedStyle]);

  const handleLessonCompletion = (lessonId) => {
    setLessons(prevLessons => prevLessons.map((lesson, index, arr) => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: true };
      }
      if (lesson.id === lessonId && index < arr.length - 1) {
        return { ...arr[index + 1], unlocked: true };
      }
      return lesson;
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Tutorial Section</h2>
      <LessonList selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} lessons={lessons} />
      <VideoPlayer lesson={lessons.find(lesson => lesson.unlocked && !lesson.completed)} onComplete={handleLessonCompletion} />
    </div>
  );
}