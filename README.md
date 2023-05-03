# DEAN-Stack

## Installation

For the sake of this project's requirements, everything I do will be for the Rocky Linux OS.

### Prerequisites
- Install Git
- Install Node (note: this command on RLES should cover installation of Node)
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

