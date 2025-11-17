import Post from "./post";

export default function Feed() {
  return (
    <div className="bg-amber-800 flex flex-col items-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((index, elem) => (
        <Post key={index}/>
      ))}
    </div>
  );
}
