import { useEffect } from "react";
import { tinykeys } from "tinykeys";
import { toast } from "react-toastify";
import { FullScreenHandle } from "react-full-screen";

const useKeyLogging = ({ handle, setIsOnFS }: { handle: FullScreenHandle, setIsOnFS: (to: boolean) => void }) => {
  const handleSusAction = (logType : string) => {
    toast.warn(
			`Action logged (${logType}), avoid using suspicious key presses during quiz.`,
			{
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			},
		);
    // TODO: update logs in the database  
  }
  const handleContextMenu = (e : MouseEvent) => {
    e.preventDefault();
    toast.warn(
			'Action logged (RIGHT CLICK), avoid using right click during quiz.',
			{
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			},
		);
    // TODO: update logs in the database
  };

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      'Control+KeyF': async (event) => {
        event.preventDefault();
        if (!handle.active) {
        	await handle.enter();
        	setIsOnFS(true);
        }
      },
      '$mod+KeyC': () => {
        handleSusAction('COPY');
      },
      '$mod+KeyV': () => {
        handleSusAction('PASTE');
      },
      'Control+Shift+KeyI': () => {
        handleSusAction('INSPECT');
      },
      '$mod+KeyF': async (event) => event.preventDefault(),

      F1: async (event) => event.preventDefault(),
      F2: async (event) => event.preventDefault(),
      F3: async (event) => event.preventDefault(),
      F4: async (event) => event.preventDefault(),
      F5: async (event) => event.preventDefault(),
      F6: async (event) => event.preventDefault(),
      F7: async (event) => event.preventDefault(),
      F8: async (event) => event.preventDefault(),
      F9: async (event) => event.preventDefault(),
      F10: async (event) => event.preventDefault(),
      F11: async (event) => event.preventDefault(),
      F12: async (event) => event.preventDefault(),
    }); 
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      unsubscribe();
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
}

export default useKeyLogging;