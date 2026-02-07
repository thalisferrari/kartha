# Guia de Conteúdo - Kartha

Este guia explica como personalizar o conteúdo da timeline.

## Estrutura dos Dados

Todo o conteúdo editável está no arquivo `data/timeline.json`.

### Configuração Geral (`config`)

| Campo | Descrição |
|-------|-----------|
| `couple_name_1` | Seu nome |
| `couple_name_2` | Nome dela |
| `site_title` | Título que aparece na aba do navegador |
| `hero_tagline` | Frase principal da tela inicial |
| `hero_subtitle` | Frase secundária abaixo da tagline |
| `closing_message` | Mensagem final da página (dedicatória) |
| `start_date` | Data de início do relacionamento (formato: `YYYY-MM-DD`) |

### Músicas (`music`)

Lista de músicas para o player flutuante. Coloque os arquivos `.mp3` na pasta `public/music/`.

```json
{
  "title": "Nome da Música",
  "artist": "Nome do Artista",
  "src": "/music/nome-do-arquivo.mp3"
}
```

### Eventos (`events`)

Cada evento é um momento especial na timeline.

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| `id` | Sim | Identificador único (use formato slug: `meu-evento`) |
| `date` | Sim | Data do evento (formato: `YYYY-MM-DD`) |
| `title` | Sim | Título do evento |
| `subtitle` | Não | Subtítulo complementar |
| `description` | Sim | Texto descritivo do momento |
| `icon` | Não | Ícone do marcador (ver lista abaixo) |
| `media` | Sim | Lista de fotos e vídeos (pode ser vazia `[]`) |
| `location` | Não | Local onde aconteceu |
| `highlight` | Não | Se `true`, destaca o evento com borda especial |
| `color_accent` | Não | Cor de destaque para eventos highlight (hex) |

### Ícones Disponíveis

- `heart` - Coração
- `calendar` - Calendário
- `map-pin` - Localização
- `camera` - Câmera
- `music` - Música
- `star` - Estrela
- `gift` - Presente
- `sparkles` - Brilho

### Mídia

Coloque as fotos na pasta `public/images/` e vídeos na pasta `public/videos/`.

**Foto:**
```json
{
  "type": "image",
  "src": "/images/nome-da-foto.jpg",
  "alt": "Descrição da foto"
}
```

**Vídeo:**
```json
{
  "type": "video",
  "src": "/videos/nome-do-video.mp4",
  "alt": "Descrição do vídeo",
  "thumbnail": "/images/thumbnail-do-video.jpg"
}
```

## Adicionando Novos Eventos

Para adicionar um novo evento, copie o modelo abaixo e adicione ao array `events` no arquivo `timeline.json`:

```json
{
  "id": "novo-evento",
  "date": "2024-01-15",
  "title": "Título do Evento",
  "subtitle": "Subtítulo opcional",
  "description": "Descrição detalhada do momento especial.",
  "icon": "heart",
  "media": [
    {
      "type": "image",
      "src": "/images/minha-foto.jpg",
      "alt": "Descrição da foto"
    }
  ],
  "location": "Local do Evento",
  "highlight": false
}
```

## Testando Localmente

```bash
npm run dev
```

Acesse `http://localhost:3000` no navegador para ver as alterações.

## Fazendo Deploy

Basta fazer push para a branch `main` no GitHub. O deploy é automático via GitHub Actions.
