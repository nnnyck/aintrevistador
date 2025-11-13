import { Injectable, Logger } from '@nestjs/common';
import WebSocket from 'ws';

@Injectable()
export class ListenerService {
  private voskWsUrl = 'ws://localhost:2700';
  private voskClients: Map<string, WebSocket> = new Map();
  // Adicionamos um Logger para mensagens de erro mais claras
  private readonly logger = new Logger(ListenerService.name);

  connectToVosk(sessionId: string) {
    if (this.voskClients.has(sessionId)) return this.voskClients.get(sessionId);

    const ws = new WebSocket(this.voskWsUrl);

    // --- CORREÇÃO ADICIONADA AQUI ---
    // Isso "captura" o erro de conexão e impede que o app quebre
    ws.on('error', (error) => {
      this.logger.warn(
        `[Vosk ${sessionId}] Falha na conexão com o Vosk: ${error.message}. O Vosk está offline?`,
      );
      this.voskClients.delete(sessionId); // Limpa o cliente com erro
    });
    // --- FIM DA CORREÇÃO ---

    ws.on('open', () =>
      this.logger.log(`Connected to Vosk for session ${sessionId}`),
    );
    ws.on('message', (msg) =>
      this.logger.log(`[Vosk ${sessionId}]`, msg.toString()),
    );
    ws.on('close', () => {
      this.voskClients.delete(sessionId);
      this.logger.log(`Vosk connection closed for session ${sessionId}`);
    });

    this.voskClients.set(sessionId, ws);
    return ws;
  }

  sendAudio(sessionId: string, audioBuffer: ArrayBuffer) {
    // A primeira chamada para 'get' falhará (mapa vazio), chamando connectToVosk
    const ws = this.voskClients.get(sessionId) || this.connectToVosk(sessionId);

    // Se o ws.on('error') foi disparado, o ws.readyState não será OPEN
    // e o áudio será ignorado com segurança, sem crashar.
    if (ws.readyState === ws.OPEN) {
      ws.send(Buffer.from(audioBuffer));
    } else if (ws.readyState === ws.CONNECTING) {
      // Se ainda estiver conectando, espera a conexão (ou o erro)
      ws.once('open', () => ws.send(Buffer.from(audioBuffer)));
    }
  }

  closeSession(sessionId: string) {
    const ws = this.voskClients.get(sessionId);
    if (ws) {
      ws.close();
      this.voskClients.delete(sessionId);
    }
  }
}