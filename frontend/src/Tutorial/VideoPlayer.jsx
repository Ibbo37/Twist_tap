import ReactPlayer from "react-player";

export function VideoPlayer({ lesson, onComplete }) {
  if (!lesson) return <p className="text-gray-500">No available lesson.</p>;

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-600">{lesson.title}</h3>
      <ReactPlayer url={lesson.videoUrl} controls width="100%" height="400px" className="rounded-lg" />
      <button 
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md"
        onClick={() => onComplete(lesson.id)}
      >
        Mark as Completed
      </button>
    </div>
  );
}
