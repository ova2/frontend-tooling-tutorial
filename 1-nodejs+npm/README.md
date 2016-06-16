# Umgang mit Node.js + NPM

[Node.js](https://nodejs.org) ist eine server-seitige Plattform und die Laufzeitumgebung für JavaScript. Damit kann der server-seitige JavaScript Code ausgeführt werden. Für die Installation wird eine Long Term Support (LTS) Version empfohlen, aber es kann auch [jede beliebige releaste Version](https://nodejs.org/en/blog/release/) heruntergeladen und installiert werden.

Mit Node.js wird auch Node Package Manager (Paketmanager) `npm` automatisch installiert. Mit dem Paketmanager lassen sich Node.js Module aus einem `npm` Registry installieren. Der Pfad zu Node.js und `npm` wird zur Umgebungsvariable `PATH` hinzugefügt (normalerweise automatisch, falls man nichts anderes bei der Installation ausgewählt hat). Danach kann man `npm` von überall in der Console aufrufen. Die installierten Node.js und `npm` Versionen lassen sich wie folgt in der Console abfragen:

```sh
node -v
npm -v
```

Eine bereits installierte Node.js Version lässt sich wie folgt aktualisieren:

```sh
npm cache clean -f
npm install -g n
n stable
```

Anstatt von `stable` kann man die Version auch explizit angeben, z.B. 

```sh
n 5.5.0
```

Auf Unix und Mac basierenden Betriebssystemen müssen die obigen Befehle mit `sudo` (mit Admin-Rechten) ausgeführt werden. Ein beliebiges Modul (noch Paket genannt) kann mit Hilfe von `npm` wie folgt installiert werden:

```sh
npm install <modulename>
```

Beispiel:

```sh
npm install gulp
```

`npm` hat Tausende von Modulen. Auf der [npm Homepage](https://www.npmjs.com/) können sie bequem gesucht werden. Projektübergreifende Tools werden global mit dem Parameter `-g` oder `--global` installiert werden. Beispiel:

```sh
npm install gulp -g
```

`npm` selbst kann man nachträglich wie folgt aktualisieren:

```sh
npm install npm -g
```

Generell werden Module mit

```sh
npm update <modulename>
```

aktualisiert. Der Befehl muss im Projekt-Hauptverzeichnis ausgeführt werden. Für globale Module wird der Parameter `-g` oder `--global` benutzt. Wird der Modulename weggelassen, werden alle Module in einem Rutsch aktualisiert. Wo werden aber die projektspezifischen Module genau installiert?






