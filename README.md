# Boss-Media

Boss-Media är en webbapplikation byggd med MERN-stack (MongoDB, Express.js, React.js, Node.js) som erbjuder digitala marknadsföringstjänster för företag. Vi hjälper klienter att växa genom strategisk marknadsföring på sociala medier som Instagram, TikTok och Facebook, samt genom att skapa professionella hemsidor.

## Funktioner

- Digital marknadsföring på sociala medier
- Hemsideskapande
- Användarvänligt gränssnitt
- Administratörspanel för användarhantering
- Offline-tillgänglighet med hjälp av PWA (Progressive Web App)

## Komma igång

Följ dessa steg för att starta projektet lokalt:

### Förutsättningar

Innan du börjar, se till att du har installerat följande:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Klona repositoryt

Klonan detta repository till din lokala maskin:

```bash
git clone https://github.com/ditt-användarnamn/boss-media.git
cd boss-media
```

### Installera beroenden

Navigera till både server- och klientsidor och installera nödvändiga paket:

```bash
cd server
npm install
cd ../client
npm install
```

### Konfigurera miljövariabler

Skapa en `.env`-fil i servermappen och lägg till följande variabler:

```
MONGODB_URI=fake_uri
JWT_SECRET=fake_secret
```

### Starta applikationen

Kör följande kommando för att starta servern:

```bash
cd server
npm run dev
```

Öppna en ny terminal och kör klienten:

```bash
cd client
npm start
```

## Användning

Besök `http://localhost:3000` i din webbläsare för att använda applikationen. Du kan registrera dig som en ny användare eller logga in om du redan har ett konto.

## Bidra

Vi välkomnar bidrag! Om du vill bidra till projektet, vänligen skapa en ny gren och skicka en pull request.

## Licens

Detta projekt är licensierat under MIT-licensen. Se [LICENSE](LICENSE) för mer information.

## Kontakta oss

Om du har några frågor, tveka inte att kontakta oss via vår [kontakt sida](mailto:kontakt@boss-media.se).

