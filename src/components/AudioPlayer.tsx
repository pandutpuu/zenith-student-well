import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  title: string;
  src: string;
  description?: string;
  isMinimal?: boolean;
}

// Sample audio URLs - in a real app, these would be your actual audio files
const SAMPLE_AUDIO = {
  meditation: "/api/placeholder/audio/meditation.mp3",
  nature: "/api/placeholder/audio/nature.mp3",
  rain: "/api/placeholder/audio/rain.mp3",
};

export const AudioPlayer = ({ title, src, description, isMinimal = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // For demo purposes, we'll simulate audio playback
      audio.play().catch(() => {
        // If actual audio fails, simulate with a timer
        setIsPlaying(true);
        const interval = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= 300) { // 5 minutes demo duration
              clearInterval(interval);
              setIsPlaying(false);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
    }
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (isMinimal) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
        <Button
          onClick={togglePlay}
          size="sm"
          className="h-10 w-10 rounded-full gradient-audio-glow text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-gray-500 font-mono">
          {formatTime(currentTime)}
        </span>
        <audio ref={audioRef} src={src} />
      </div>
    );
  }

  return (
    <Card className="gradient-card border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Main Play/Pause Button */}
          <Button
            onClick={togglePlay}
            size="lg"
            className="h-20 w-20 rounded-full gradient-audio-glow text-white shadow-2xl hover:shadow-3xl transition-all duration-300 animate-glow hover:scale-105"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 300)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              onClick={resetAudio}
              variant="outline"
              size="sm"
              className="rounded-full hover:scale-105 transition-transform"
              aria-label="Reset audio to beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                  }
                }}
                className="w-20 accent-purple-500"
                aria-label="Volume control"
              />
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={src} />
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;