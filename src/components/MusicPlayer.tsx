import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus, Music2, Radio, Video, Podcast, Store, ArrowLeft, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Song {
  id: string;
  title: string;
  artist: string;
}

const tabs = ['favorites', 'playlists', 'songs', 'albums', 'artists'];

const sampleSongs = [
  { id: '1', title: 'Feeling good', artist: 'Muse' },
  { id: '2', title: 'Today, the end of days', artist: 'Hypnostate' },
  { id: '3', title: 'Of all living creatures, why a human being?', artist: 'Alondra Bentley, Joserra Senperena' },
  { id: '4', title: 'Excuses', artist: 'The morning benders' },
  { id: '5', title: 'Kingdom of rust', artist: 'Doves' },
  { id: '6', title: 'Seventeen years', artist: 'Ratatat' },
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [activeTab, setActiveTab] = useState('favorites');
  const [importedSongs, setImportedSongs] = useState<Song[]>([]);
  const { toast } = useToast();

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newSong = {
        id: Math.random().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist'
      };
      setImportedSongs(prev => [...prev, newSong]);
      setActiveTab('songs'); // Switch to songs tab after import
      toast({
        title: "Music imported",
        description: `Added ${file.name} to your library`,
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <div className="space-y-6">
            {sampleSongs.map((song) => (
              <div
                key={song.id}
                className="cursor-pointer"
                onClick={() => setCurrentSong(song)}
              >
                <h3 className="text-xl font-light">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            ))}
          </div>
        );
      case 'songs':
        return (
          <div className="space-y-6">
            {importedSongs.map((song) => (
              <div
                key={song.id}
                className="cursor-pointer"
                onClick={() => setCurrentSong(song)}
              >
                <h3 className="text-xl font-light">{song.title}</h3>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            ))}
          </div>
        );
      default:
        return <div className="text-gray-500">No content available</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="p-6 pb-2">
        <h1 className="text-2xl font-extralight tracking-wide uppercase">
          WEPLAY
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar px-6 space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-4xl font-extralight tracking-wide whitespace-nowrap transition-colors",
              activeTab === tab ? "text-white" : "text-gray-500"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4">
        {renderContent()}

        {/* Import Music Button */}
        <div className="mt-8">
          <label className="metro-tile flex items-center justify-center gap-4 bg-transparent hover:bg-white/10 transition-colors">
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

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 mt-auto">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </div>

      {/* Player Controls */}
      {currentSong && (
        <div className="fixed bottom-20 left-0 right-0 bg-zinc-900 p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-light">{currentSong.title}</h3>
            <p className="text-sm text-gray-500">{currentSong.artist}</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
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
    </div>
  );
};