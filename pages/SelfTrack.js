import Sidebar from '../components/Sidebar';
import ProjectList from './posts/ProjectList';

export default function SelfTrack() {
  return (
    <div className="h-screen"> {/* Ensure full viewport height */}
      <main className="flex max-w-7xl mx-auto overflow-hidden"> {/* Use flex for horizontal layout */}
        {/* Sidebar with a mild gray border to the right */}
        <div className="flex-none w-64 border-r border-gray-200 "> {/* Adjust width as needed */}
          <Sidebar />
        </div>

        {/* ProjectList occupying the remaining space */}
        <div className="flex-grow overflow-auto">
          <ProjectList />
        </div>
      </main>
    </div>
  );
}
