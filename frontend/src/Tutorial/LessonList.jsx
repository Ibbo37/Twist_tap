import { danceStyles } from "./dance";

// LessonList.js
export function LessonList({ selectedStyle, setSelectedStyle, lessons }) {
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-700">Select a Dance Style</h3>
        <div className="flex space-x-4 mb-4">
          {Object.keys(danceStyles).map(style => (
            <button 
              key={style} 
              className={`px-4 py-2 rounded-lg ${selectedStyle === style ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`} 
              onClick={() => setSelectedStyle(style)}
            >
              {style}
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {lessons.map(lesson => (
            <li key={lesson.id} className={`p-2 rounded-lg ${lesson.unlocked ? "bg-blue-100 text-black" : "bg-gray-200 text-gray-400"}`}>
              {lesson.title} {lesson.unlocked ? "✅" : "🔒"}
            </li>
          ))}
        </ul>
      </div>
    );
  }