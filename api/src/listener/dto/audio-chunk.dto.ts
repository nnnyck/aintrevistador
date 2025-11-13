export class AudioChunkDto {
  /**
   * Áudio em Base64 PCM16 mono 16kHz
   */
  audioBase64: string;

  /**
   * Identificador da sessão do usuário
   */
  sessionId: string;
}
