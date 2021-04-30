import { useEffect } from "react";
import Header from "../components/Header";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found - Instagram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl font-bold">Not found!</p>
      </div>
    </div>
  );
};

export default NotFound;
