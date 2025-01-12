import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Song {
  id: string;
  title: string;
  artist: string;
}

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const { toast } = useToast();

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setCurrentSong({
        id: Math.random().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist'
      });
      toast({
        title: "Music imported",
        description: `Added ${file.name} to your library`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="metro-text mb-2">Now Playing</h1>
          <div className="metro-tile rounded-lg">
            {currentSong ? (
              <>
                <h2 className="text-2xl font-light mb-2">{currentSong.title}</h2>
                <p className="text-muted-foreground">{currentSong.artist}</p>
              </>
            ) : (
              <p className="text-muted-foreground">No song selected</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log('Previous')}
          >
            <SkipBack className="h-6 w-6" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="h-12 w-12"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log('Next')}
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        <div>
          <h2 className="metro-text mb-4">Library</h2>
          <div className="grid gap-4">
            <label className="metro-tile rounded-lg flex items-center justify-center">
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileImport}
              />
              <div className="flex flex-col items-center">
                <Plus className="h-8 w-8 mb-2" />
                <span>Import Music</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};