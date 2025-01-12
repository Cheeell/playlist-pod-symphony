import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus, Music2, Radio, Video, Podcast, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Song {
  id: string;
  title: string;
  artist: string;
}

const menuItems = [
  { icon: <Music2 className="h-5 w-5" />, label: 'music' },
  { icon: <Video className="h-5 w-5" />, label: 'videos' },
  { icon: <Podcast className="h-5 w-5" />, label: 'podcasts' },
  { icon: <Radio className="h-5 w-5" />, label: 'radio' },
  { icon: <Store className="h-5 w-5" />, label: 'marketplace' },
];

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
    <div className="flex flex-col min-h-screen max-w-md mx-auto">
      <header className="p-6">
        <h1 className="metro-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          music
        </h1>
      </header>

      <nav className="mb-8">
        {menuItems.map((item, index) => (
          <div key={index} className="metro-list-item flex items-center gap-4">
            {item.icon}
            <span className="font-light">{item.label}</span>
          </div>
        ))}
      </nav>

      {currentSong && (
        <div className="p-6">
          <h2 className="metro-heading mb-2">now playing</h2>
          <div className="metro-tile">
            <h3 className="text-xl font-light mb-1">{currentSong.title}</h3>
            <p className="metro-subtext">{currentSong.artist}</p>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="ghost" size="icon">
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
            
            <Button variant="ghost" size="icon">
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      <div className="p-6">
        <label className="metro-tile flex items-center justify-center gap-4">
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileImport}
          />
          <Plus className="h-6 w-6" />
          <span className="font-light">Import Music</span>
        </label>
      </div>
    </div>
  );
};