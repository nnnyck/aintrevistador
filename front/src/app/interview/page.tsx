'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, PhoneOff, Video as VideoIcon, VideoOff } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { ChatPanel } from '@/components/ChatPanel'; // <-- Importamos o novo chat

// Configuração do Socket
const SOCKET_URL = 'http://localhost:3000/listener'; 

export default function InterviewPage() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [status, setStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected');

  // Referências
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Conectado ao Gateway /listener');
      setStatus('connected');
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado');
      setStatus('disconnected');
    });

    startMedia();

    return () => {
      socket.disconnect();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true // Voltamos ao 'true' simples e seguro
      });
      
      streamRef.current = stream;
      
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = stream;
      }
      setupAudioRecorder(stream);
    } catch (error) {
      console.error("Erro ao acessar media:", error);
      setStatus('error');
    }
  };

  const setupAudioRecorder = (stream: MediaStream) => {
    if (stream.getAudioTracks().length === 0) {
      console.error("❌ Nenhum track de áudio encontrado!");
      return;
    }
    try {
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && socketRef.current?.connected) {
          const arrayBuffer = await event.data.arrayBuffer();
          socketRef.current.emit('audio-chunk', {
            sessionId: 'session-123',
            audioBuffer: arrayBuffer
          });
        }
      };
      
      recorder.start(1000); 
      console.log("🎙️ Gravação iniciada");
    } catch (err) {
      console.error("❌ Erro fatal ao iniciar gravador:", err);
      setStatus('error');
    }
  };

  // Controles de UI
  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      
      {/* --- NOVA ESTRUTURA DE LAYOUT (LADO A LADO) --- */}
      <div className="flex w-full max-w-7xl h-[85vh] gap-4">

        {/* --- COLUNA ESQUERDA: VÍDEO --- */}
        <div className="flex flex-col flex-grow w-2/3">
          
          {/* ÁREA PRINCIPAL: AVATAR DA IA */}
          <div className="w-full h-full bg-gray-800 rounded-2xl overflow-hidden shadow-2xl relative border border-gray-700">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="text-center space-y-4 animate-pulse">
                    <div className="w-32 h-32 bg-blue-600 rounded-full mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                        <span className="text-4xl">🤖</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-blue-100">AI Interviewer</h2>
                    <p className="text-blue-300/60">Listening...</p>
                </div>
            </div>

            {/* CÂMERA DO USUÁRIO (PIP) */}
            <Card className="absolute bottom-4 right-4 w-48 sm:w-64 aspect-video bg-black border-gray-700 shadow-xl overflow-hidden z-10">
              {isVideoOn ? (
                <video 
                  ref={userVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                  <VideoOff className="w-8 h-8" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs font-medium text-white shadow-black drop-shadow-md">You</span>
              </div>
            </Card>
          </div>

          {/* BARRA DE CONTROLE ABAIXO DO VÍDEO */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button onClick={toggleMic} size="icon" className={`w-14 h-14 rounded-full text-xl ${!isMicOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
              {isMicOn ? <Mic /> : <MicOff />}
            </Button>
            <Button onClick={toggleVideo} size="icon" className={`w-14 h-14 rounded-full text-xl ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
              {isVideoOn ? <VideoIcon /> : <VideoOff />}
            </Button>
            <Button size="icon" className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white ml-4" onClick={() => window.location.href = '/'}>
              <PhoneOff />
            </Button>
          </div>
        </div>

        {/* --- COLUNA DIREITA: CHAT --- */}
        <div className="w-1/3 flex-shrink-0 h-full">
          <ChatPanel />
        </div>

      </div>
    </div>
  );
}