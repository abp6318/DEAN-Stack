# DEAN-Stack

## Installation

For the sake of this project's requirements, everything I do will be for the Rocky Linux OS.

### Prerequisites
- Install Git
```
sudo yum install git
git --version
```
- Install Node (note: this command on RLES should cover installation of Node BUT if later you run into a version issue, install NVM and run `nvm install --lts` to get the latest version of Node)
```
node --version
```
- Install NPM (installed by default with Node on RLES)
- [Install Neo4j Desktop](https://neo4j.com/download-center/#desktop)
  - [Additional help installing Neo4j Desktop](https://neo4j.com/docs/desktop-manual/current/installation/download-installation/)
  - Make sure you copy down your installation key when downloading the AppImage!

### Database - Neo4j (Desktop)
At this point, you should have already download the Neo4j Desktop app from the link provided under Prerequisites. 

1. Open up a new terminal, and change the permission of the AppImage you just downloaded.
```
chmod u+x ./path/to/AppImage
```

2. Then run the application...
```
./path/to/AppImage
```

3. Once the application opens up, it will prompt you with a login or for your installation key (which you should have just been offered when downloading the image).

4. Copy the installation key and allow the application to finish setting up.

5. Once the application is done setting up, stop the demo project you are provided with and create a new project (name doesn't matter).

6. Click the "Add +" button on the right side of the window and then "Local DBMS."

7. The default username for your database will be `neo4j`, but it's up to you to pick your password. Whatever password you choose will be later placed in your `.env` file in the `/backend` directory. Passwords for your database can be easily reset through the Neo4j Desktop app.

8. Start your database, wait for it to finish loading, open it and go and fetch the database dump I have in the backend: [https://github.com/abp6318/DEAN-Stack/blob/main/backend/neo4j_calls/neo4j_dump.txt](https://github.com/abp6318/DEAN-Stack/blob/main/backend/neo4j_calls/neo4j_dump.txt)

9. Paste the contents of `neo4j_dump.txt` inside the database prompt and click the play button.


### Backend - Node and Express
1. Clone the repository (if you haven't already) and change into the `/backend` directory.
```
git clone https://github.com/abp6318/DEAN-Stack.git && cd ./DEAN-Stack/backend
```

2. Install the Node modules.
```
npm i
```
Note: You might need to add `sudo` to the start of that or run it more than once. Sometimes NPM is weird.

3. Copy the `.env.example` file as a new file called `.env`
```
cp .env.example .env
```

4. Fill out the `.env` now
  - `PORT` is fine as 3001 (unless you plan on running something else there)
  - `NEO4JURI` is `bolt://localhost:7687` by default for me -- and whatever it is for you should appear at the top of the client that appears when you click "Open" in Neo4j Desktop
  - `NEO4JUSERNAME` is `neo4j` but I believe you can change this
  - `NEO4JPASSWORD` is whatever you set it to. For the sake of my demo in class, I'm doing `password` :P
  - `SECRET_KEY` is for your JWT tokens! This is to ensure API calls are authenticated. Make your own key with one of the [256-bit WEP keys from this site](https://randomkeygen.com/) or any other you like! I'm including mine in the `.env.example` so login works on local and on production.

5. Start the `/backend`.
```
npm start
```


### Frontend
1. Clone the repository (if you haven't already) and change into the `/frontend` directory.
```
git clone https://github.com/abp6318/DEAN-Stack.git && cd ./DEAN-Stack/frontend
```

2. Install the Node modules.
```
npm i
```
Note: You might need to add `sudo` to the start of that or run it more than once. Sometimes NPM is weird.

3. Start the client.
```
npm start
```


### Postman
1. Run this first
```
sudo dnf install libXScrnSaver
```

2. Download and login to Postman: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
```
tar -xvf <tar-name-here
```

### Accessing Outside VPS
1. TODO


### Other Commands Used
In no particular order...
```
npm init
npm install <node-package-name>
npm install -g @angular/cli
ng serve
ng generate component <component-name>
ng generate environments
```

