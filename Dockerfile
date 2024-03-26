# Use a imagem oficial do Node.js
FROM node:14-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta onde a aplicação Vue.js será executada
EXPOSE 8080

# Inicie a aplicação Vue.js
CMD ["npm", "run", "serve"]
