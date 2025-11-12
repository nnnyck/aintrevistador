# Usa a imagem oficial do SadTalker (já vem com tudo pronto)
FROM wawa9000/sadtalker:latest

# Define diretório de trabalho
WORKDIR /app

# Cria pastas de entrada e saída compartilhadas
RUN mkdir -p /app/inputs /app/outputs

# Mantém o container rodando “ocioso” até receber comandos
CMD ["tail", "-f", "/dev/null"]
