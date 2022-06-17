# Setup
container
>cd .devcontainer

>docker-compose up -d


backend
>cd backend

>npm install

>npm start



# Queries
1. Auflisten der Posts, die von einem Account gemacht wurden, bzw. ihm zugeordnet wurden
>

2. Finden der 100 Accounts mit den meisten Followern
> queryTopFollower.ts

3. Finden der 100 Accounts, die den meisten der Accounts folgen, die in 1) gefunden wurden
> queryTopFollowersOfUsersWithTopFollowers

4. Auflisten der Informationen für die persönliche Startseite eines beliebigen Accounts (am besten mit den in 2) gefundenen Accounts ausprobieren); die Startseite soll Folgendes beinhalten (als getrennte Queries umsetzen)
  
    * die Anzahl der Follower
    > queryFollowerCoutOfUser.ts

    * die Anzahl der verfolgten Accounts
    >

    * wahlweise die 25 neusten oder die 25 beliebtesten Posts der verfolgten Accounts (per DB-Abfrage)
    >

5. Caching der Posts für die Startseite (vgl. 4), erfordert einen sog. Fan-Out in den Cache jedes Followers beim Schreiben eines neuen Posts 
>

6. Auflisten der 25 beliebtesten Posts, die ein geg. Wort enthalten (falls möglich auch mit UND-Verknüpfung mehrerer Worte)
>