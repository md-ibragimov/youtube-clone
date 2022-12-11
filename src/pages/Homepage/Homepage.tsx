import { useEffect } from "react";

function Homepage({}) {
  useEffect(() => {
    document.title = 'YouTube'
  }, [])
  return (
    <div>
      homepage
    </div>
  );
}

export default Homepage;