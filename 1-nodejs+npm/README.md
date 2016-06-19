# Umgang mit Node.js + NPM

[Node.js](https://nodejs.org) ist eine server-seitige Plattform und die Laufzeitumgebung für JavaScript. Damit kann der server-seitige JavaScript Code ausgeführt werden. Für die Installation wird eine Long Term Support (LTS) Version empfohlen, aber es kann auch [jede beliebige releaste Version](https://nodejs.org/en/blog/release/) heruntergeladen und installiert werden.

Mit Node.js wird auch Node Package Manager (Paketmanager) `npm` automatisch installiert. Mit dem Paketmanager lassen sich Node.js Module aus einem `npm` Registry installieren. Der Pfad zu Node.js und `npm` wird zur Umgebungsvariable `PATH` hinzugefügt (normalerweise automatisch, falls man nichts anderes bei der Installation ausgewählt hat). Danach kann man `npm` von überall in der Console aufrufen. Die installierten Node.js und `npm` Versionen lassen sich wie folgt abfragen:

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

Anstatt von `stable` kann eine Version auch explizit angegeben werden, z.B. 

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

`npm` hat Tausende von Modulen. Sucht man ein bestimmtes Modul, hat man zwei Moglichkeiten - die Suche auf der [npm Homepage](https://www.npmjs.com/) oder via

```sh
npm search <search term>
```

Projektübergreifende Tools werden global mit dem Parameter `-g` oder `--global` installiert. Beispiel:

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

aktualisiert. Der Befehl muss im Projekt-Hauptverzeichnis ausgeführt werden. Für globale Module wird der Parameter `-g` oder `--global` benutzt. Wird der Modulename weggelassen, werden alle Module in einem Rutsch aktualisiert.

Wo genau werden aber die projektspezifischen Module installiert? Dazu legen wir ein leeres Projekt-Verzeichnis an und führen dort folgendes aus:

```sh
npm init
```

Daraufhin wird eine Datei namens `package.json` angelegt. Das Erzeugen von `package.json` ist interaktiv. Es werden einige Fragen gestellt, die man beantworten muss. Man kann die Datei selbstverständlich auch nachträglich anpassen, z.B. die Tags `repository`, `keywords`, `script`, usw. hinzufügen. Eine gute Übersicht aller möglichen Einstellungen gibt es in der [offizellen Dokumentation](https://docs.npmjs.com/files/package.json). Wenn man die Applikation nicht in dem öffentlichen `npm` Repository veröffentlichen will, sollte man die Property `private` auf `true` setzen: `"private": true`. 

Java-Entwickler können diese Datei als `pom.xml` in Maven vorstellen. Dort werden auch Projekt-Dependencies verwaltet. Es gibt zwei Arten von Dependencies:

__1.)__ Dependencies, die man zur Laufzeit braucht. Die werden mit der Web Applikation gebündelt und ausgeliefert. Das wären z.B. jQuery, AngularJS, TypeScript o.ä. Bibliotheken. Sie werden im Projekt-Hauptverzeichnis installiert, d.h. lokal, ohne den Parameter `-g` oder `--global`. Java-Entwickler können sich solche Dependencies als JAR Dateien unter `WEB-INF/lib` vorstellen. Die Module werden in einen Unterordner namens `node_modules` heruntergeladen und stehen damit dem ganzen Projekt zur Verfügung. Führt man z.B. `npm install underscore` aus, hat man die folgende Struktur:
```sh
<projekt root>
    node_modules
        underscore
            package.json
            underscore.js
            README.md
            ...
```
Installiert man eine Dependency mit
```sh
npm install <modulename> --save
```
wird sie auch in der `package.json` Datei, in der Sektion `dependencies`, gespeichert. D.h. in der `package.json` Datei werden dann alle benötigten Dependencies aufgelistet. Das ist wichtig, wenn man in einem Team arbeitet. `package.json` steht unter Versionskontrolle. Wenn nun eine andere Person das Projekt auscheckt und `npm install` ausfrühren läßt, hat sie automatisch alle Dependencies bei sich lokal im Verzeichnis `node_modules` (`node_modules` steht nicht unter Versionskontrolle).

__2.)__ Dependencies, die man zur Build-Zeit braucht. Das sind z.B. die Build-Tools wie Gulp oder Webpack, Development-Server, Test-Frameworks, Linting Tools, u.ä. Java-Entwickler können sich solche Dependencies als Maven Plugins vorstellen. Sie werden nicht mit der Web Applikation ausgeliefert. Solche Dependencies muss man mit
```sh
npm install <modulename> --save-dev
```
installieren. Z.B. `npm install webpack --save-dev`. Damit werden sie auch in der `package.json` Datei, in der Sektion `devDependencies`, gespeichert. Jeder im Team kann sie nutzen, nachdem er `npm install` ausgeführt hat.

Die Datei `package.json` hat somit zwei wichtige Sektionen: `devDependencies` und `dependencies`. Ein Auschnitt aus der `package.json` könnte so aussehen:

```sh
"devDependencies": {
  "css-loader": "^0.23.1",
  "rimraf": "^2.5.2",
  "style-loader": "^0.13.1",
  "webpack": "^1.13.0"
},
"dependencies": {
  "promise-light": "^0.1.8"
  "jquery": ">=1.11.0"
}
```

Es gibt noch eine Sektion `peerDependencies`. Dort werden alle Dependencies mit bestimmten Versionen aufgelistet, die man braucht, damit das aktuelle Modul (eine Bibliothek) normal funktionieren kann. Die `npm` Version 3 gibt eine Warnung aus, falls eine Dependency aus `peerDependencies` noch nicht installiert ist. Frühere Versionen von [PrimeNG](http://www.primefaces.org/primeng/) haben z.B. eine Dependency zu [PrimeUI](http://www.primefaces.org/primeui/) verlangt:

```sh
"peerDependencies": {
  "primeui": "^4.1.12"
}
```

Node.js Module verfolgen eine so genannte semantische Versionierung. Ein Modul hat eine Version im Format X.Y.Z (Major.Minor.Patch). Behebt der Entwickler einen Fehler, ohne die Abwärtskompatibilität zu beeinträchtigen, wird lediglich die Patchnummer um 1 erhöht. Fügt der Entwickler neue Funktionalität hinzu ohne Beeinträchtigung der Abwärtskompatibilität, wird die Minornummer um 1 erhöht. Beeinträchtigt der Entwickler die Abwärtskompatibilität, wird die Majornummer um 1 erhöht. Bei den Dependencies kann kann nicht nur exakte Versionen angeben, sondern auch Ranges und mehr. [npm semver calculator](http://semver.npmjs.com/) stellt eine gute "Spielwiese" dar, um dies auszuprobieren. Es wird schnell klar, wie man Major, Minor, Patch Versionen, Ranges oder exakte Versionen auswählen kann. Hier sind einige Beispiele:

```sh
"dependencies": {
  "package1": "1.0.0",         // exakte 1.0.0 Version
  "package2": "1.0.x",         // nur die Patch-Releases in Version 1.0 (meist empfohlen)
  "package3": "*",             // letzte Version (nicht empfohlen)
  "package4": ">=1.0.0",       // beliebige Änderungen nach 1.0.0
  "package5": "<1.9.0",        // eine Version kleiner als 1.9.0
  "package6": "~1.8.0",        // Shorthand für >= 1.8.0 < 1.9.0
  "package7": "^1.1.0",        // Shorthand für >=1.1.0 < 2.0.0
  "package8": "latest",        // Tag name für die latest Version
  "package9": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
}
```

Die exakten Versionen und Ranges kann man auch explizit bei der Installation angeben. Auch bestimmte Git-Branches lassen sich angeben. Beispiele:

```sh
npm install jquery@1.11.0 --save
npm install sax@">=0.1.0 <0.2.0" --save
npm install -g git+https://git@github.com/gulpjs/gulp-cli.git#4.0
```

`npm` hat eine eingebaute Versions-Bumping. Damit wird die Versionsnummer in der `package.json` Datei um eins erhöht, ein Git-Commit gemacht und dieser Commit getaggt. Hier sind die Befehle:

```sh
npm version patch  // Beispiel-Ergebnis: 1.1.1 -> 1.1.2
npm version minor  // Beispiel-Ergebnis: 1.1.1 -> 1.2.0
npm version major  // Beispiel-Ergebnis: 1.1.1 -> 2.0.0
```

Mit dem Parameter `--git-tag-version=false` kann man das Tagging unterbinden. Das geht auch dauerhaft mit dem Befehl `npm config set git-tag-version false`. Mit dem Befehl `npm config set` kann man übrigens verschiedene Konfigurationsmöglichkeiten vornehmen. Es wird oft verwendet, um einen Proxy-Server in einem Unternehmensnetz für `npm` bekanntzugeben. 
 
```sh
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

oder wenn man einen privaten `npm` Server für das Unternehmen aufgesetzt hat (anstatt Default https://registry.npmjs.org/) und ihn beim `npm` registrieren möchte.

```sh
npm config set registry https://<whatever>/
```

Generell, mit `npm config set <whatever>` wird die Datei `.npmrc` modifiziert. Die Datei `.npmrc` wird entweder im Projekt-Hauptverzeichnis (Konfiguration pro Projekt) oder im Benutzer-Homeverzeichnis angelegt. D.h. entweder irgendwo in `/path/to/my/project/.npmrc` oder `~/.npmrc`.

Weitere nützliche `npm` Befehle
