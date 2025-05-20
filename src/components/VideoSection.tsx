import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

interface VideoLogEntry {
  timestamp: string;
  event: string;
  details?: string;
  error?: any;
}

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [videoLogs, setVideoLogs] = useState<VideoLogEntry[]>([]);
  const [buffering, setBuffering] = useState(true);
  const { toast } = useToast();

  // Updated video URL
  const videoUrl = "https://cnkcoxooaetehlufjwbr.supabase.co/storage/v1/object/public/avatars//freepik__aerial-shot-transform-a-muddy-brown-river-into-a-c__77961.mp4";

  // Memoizar a função de log para evitar recriação em cada renderização
  const addToLog = useCallback((event: string, details?: string, error?: any) => {
    const timestamp = new Date().toISOString();
    const logEntry: VideoLogEntry = {
      timestamp,
      event,
      details,
      error
    };
    
    // Usar console.log condicional apenas quando necessário
    if (process.env.NODE_ENV === 'development') {
      console.log(`Video Log [${timestamp}]: ${event}${details ? ` - ${details}` : ''}`);
      if (error) {
        console.error("Video Error:", error);
      }
    }
    
    setVideoLogs(prev => [...prev, logEntry]);
    
    // Se for um erro, mostrar um toast
    if (error) {
      toast({
        title: `Erro no Vídeo: ${event}`,
        description: details || "Ocorreu um problema com o vídeo",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Função memoizada para verificar buffer
  const hasEnoughBuffer = useCallback(() => {
    if (!videoRef.current) return false;
    
    const video = videoRef.current;
    if (video.buffered.length === 0) return false;
    
    const currentTime = video.currentTime;
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    
    // Consideramos suficiente se tivermos pelo menos 3 segundos de buffer
    return bufferedEnd - currentTime >= 3;
  }, []);

  // Memoizar handlePlayVideo para evitar recriação
  const handlePlayVideo = useCallback(() => {
    if (videoRef.current) {
      try {
        setIsLoading(true);
        addToLog("PLAY_ATTEMPT", "Tentativa manual de reprodução");

        // Certifique-se de que o vídeo está pronto para ser reproduzido
        if (videoRef.current.readyState >= 2) {
          videoRef.current.play().then(() => {
            addToLog("PLAY_SUCCESS", "Vídeo iniciado manualmente com sucesso");
            setVideoPlaying(true);
            setIsLoading(false);
            setShowPlayButton(false);
          }).catch(error => {
            addToLog("PLAY_ERROR", "Erro ao reproduzir vídeo manualmente", error);
            setVideoError("Erro ao reproduzir o vídeo");
            setIsLoading(false);
            setShowPlayButton(true);
            toast({
              title: "Erro ao reproduzir vídeo",
              description: "Tente novamente ou verifique suas configurações de mídia",
              variant: "destructive"
            });
          });
        } else {
          // Se o vídeo não estiver pronto, aguarde o evento canplay
          addToLog("WAITING_CANPLAY", `Estado atual: ${videoRef.current.readyState}`);
          const onCanPlay = () => {
            videoRef.current?.play().then(() => {
              addToLog("DELAYED_PLAY_SUCCESS", "Vídeo iniciado após carregar");
              setVideoPlaying(true);
              setIsLoading(false);
              setShowPlayButton(false);
              videoRef.current?.removeEventListener('canplay', onCanPlay);
            }).catch(error => {
              addToLog("DELAYED_PLAY_ERROR", "Erro ao iniciar vídeo após carregamento", error);
              setVideoError("Erro ao iniciar o vídeo");
              setIsLoading(false);
              setShowPlayButton(true);
              videoRef.current?.removeEventListener('canplay', onCanPlay);
            });
          };
          videoRef.current.addEventListener('canplay', onCanPlay);
          videoRef.current.load(); // Force reload
          addToLog("FORCE_RELOAD", "Forçando recarregamento do vídeo");
        }
      } catch (error) {
        addToLog("GENERAL_ERROR", "Erro ao tentar reproduzir", error);
        setVideoError("Erro ao iniciar o vídeo");
        setIsLoading(false);
        setShowPlayButton(true);
      }
    } else {
      addToLog("REF_ERROR", "Referência de vídeo não disponível");
    }
  }, [addToLog, toast]);

  useEffect(() => {
    // Uso de uma variável para limitar operações pesadas
    let isMounted = true;
    
    const loadVideo = () => {
      if (!isMounted || !videoRef.current) return;
      
      try {
        addToLog("INIT", "Inicializando vídeo");
        // Reset video element
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.load();
        setIsLoading(true);
        setBuffering(true);
        addToLog("LOAD", "Vídeo inicializado com sucesso");
        
        // Check for autoplay capabilities
        const videoElement = videoRef.current;
        const autoplayPromise = videoElement.play();
        
        if (autoplayPromise !== undefined) {
          autoplayPromise
            .then(() => {
              if (isMounted) {
                addToLog("AUTOPLAY_SUCCESS", "Reprodução automática iniciada com sucesso");
                setAutoplayFailed(false);
                setShowPlayButton(false);
              }
            })
            .catch(error => {
              if (isMounted) {
                addToLog("AUTOPLAY_FAILED", "Reprodução automática bloqueada pelo navegador", error);
                setAutoplayFailed(true);
                setShowPlayButton(true);
                setVideoPlaying(false);
              }
            });
        }
      } catch (error) {
        if (isMounted) {
          addToLog("ERROR", "Erro ao carregar vídeo", error);
          setVideoError("Erro ao carregar o vídeo");
          setShowPlayButton(true);
        }
      }
    };
    
    loadVideo();
    const video = videoRef.current;
    
    // Configurar handlers uma vez e remover ao desmontar
    if (video) {
      // Manejar erros e estados do vídeo
      const handleError = (e: Event) => {
        const videoElement = e.target as HTMLVideoElement;
        const errorCode = videoElement.error ? videoElement.error.code : 'desconhecido';
        const errorMessage = videoElement.error ? videoElement.error.message : 'Erro não especificado';
        
        addToLog("ERROR", `Código: ${errorCode}, Mensagem: ${errorMessage}`, e);
        setVideoError("Erro no vídeo");
        setVideoPlaying(false);
        setIsLoading(false);
        setShowPlayButton(true);
      };
      
      const handleCanPlay = () => {
        addToLog("CAN_PLAY", "Vídeo pode ser reproduzido");
        setVideoLoaded(true);
        setIsLoading(false);
        
        // Verificar se já temos buffer suficiente
        if (hasEnoughBuffer()) {
          setBuffering(false);
          addToLog("BUFFER_READY", "Buffer inicial suficiente");
        }
      };
      
      const handlePlaying = () => {
        addToLog("PLAYING", "Vídeo está reproduzindo");
        setVideoPlaying(true);
        setVideoLoaded(true);
        setIsLoading(false);
        setBuffering(false);
        setShowPlayButton(false);
      };
      
      const handleWaiting = () => {
        addToLog("WAITING", "Vídeo está carregando");
        setIsLoading(true);
        setBuffering(true);
      };
      
      const handlePause = () => {
        addToLog("PAUSE", "Vídeo foi pausado");
        setVideoPlaying(false);
        setIsLoading(false);
        setShowPlayButton(true);
      };
      
      const handleStalled = () => {
        addToLog("STALLED", "Vídeo travou durante o carregamento");
        setIsLoading(true);
        setBuffering(true);
        setShowPlayButton(true);
      };
      
      const handleAbort = () => {
        addToLog("ABORT", "Carregamento do vídeo foi abortado");
        setShowPlayButton(true);
      };
      
      const handleLoadStart = () => {
        addToLog("LOAD_START", "Iniciou o carregamento do vídeo");
        setIsLoading(true);
        setBuffering(true);
      };
      
      const handleEnded = () => {
        addToLog("ENDED", "Vídeo terminou a reprodução");
        setShowPlayButton(true);
      };
      
      const handleSeeking = () => {
        addToLog("SEEKING", `Buscando posição: ${video.currentTime.toFixed(2)}s`);
      };
      
      const handleVolumeChange = () => {
        addToLog("VOLUME", `Volume alterado: ${video.volume.toFixed(2)}, Mudo: ${video.muted}`);
      };
      
      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          const percentBuffered = (bufferedEnd / duration * 100).toFixed(2);
          addToLog("BUFFER", `Buffer: ${percentBuffered}%`);
          
          // Verificar se temos buffer suficiente
          if (hasEnoughBuffer()) {
            setBuffering(false);
          }
        }
      };

      video.addEventListener('error', handleError);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('playing', handlePlaying);
      video.addEventListener('waiting', handleWaiting);
      video.addEventListener('pause', handlePause);
      video.addEventListener('stalled', handleStalled);
      video.addEventListener('abort', handleAbort);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('seeking', handleSeeking);
      video.addEventListener('volumechange', handleVolumeChange);
      video.addEventListener('progress', handleProgress);
      
      return () => {
        isMounted = false;
        video.removeEventListener('error', handleError);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('stalled', handleStalled);
        video.removeEventListener('abort', handleAbort);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('seeking', handleSeeking);
        video.removeEventListener('volumechange', handleVolumeChange);
        video.removeEventListener('progress', handleProgress);
        
        addToLog("CLEANUP", "Removendo listeners do vídeo");
      };
    }
  }, [hasEnoughBuffer]);

  return (
    <div className="relative bg-white/5 backdrop-blur-md border border-white/10 h-full w-full rounded-lg overflow-hidden shadow-2xl">
      <video 
        ref={videoRef}
        muted 
        loop 
        playsInline 
        preload="auto" 
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => addToLog("JSX_ERROR", "Erro no elemento de vídeo", e)}
      >
        <source src={videoUrl} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="text-white text-center p-4">{videoError}</p>
        </div>
      )}
      
      {isLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {showPlayButton && !isLoading && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button
            onClick={handlePlayVideo}
            className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-6 transition-all duration-300"
          >
            <Play className="h-10 w-10" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Exportar como componente memoizado
export default React.memo(VideoSection);
