# Umgang mit Node.js + NPM

## Grundwissen

[Node.js](https://nodejs.org) ist eine server-seitige Plattform und die Laufzeitumgebung für JavaScript. Damit kann der server-seitige JavaScript Code ausgeführt werden. Für die Installation wird eine Long Term Support (LTS) Version empfohlen, aber es kann auch [jede beliebige releaste Version](https://nodejs.org/en/blog/release/) installiert werden.

Mit Node.js wird auch Node Package Manager (Paketmanager) `npm` automatisch installiert. Mit dem Paketmanager lassen sich Node.js Module (noch Packages genannt) aus einem `npm` Registry installieren. Der Pfad zu Node.js und `npm` wird zur Umgebungsvariable `PATH` hinzugefügt (normalerweise automatisch, falls man nichts anderes bei der Installation ausgewählt hat). Danach kann man `npm` von überall in der Console aufrufen. Die installierten Node.js und `npm` Versionen lassen sich wie folgt abfragen:

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

aktualisiert. Der Befehl muss im Projekt-Hauptverzeichnis ausgeführt werden. Für globale Module wird der Parameter `-g` oder `--global` benutzt. Wird der Modulename weggelassen, werden alle Module in einem Rutsch aktualisiert. Natürlich lassen sich Module auch deinstallieren. Dafür schreibt man `uninstall` an der Stelle `install`. Z.B.

```sh
npm uninstall gulp -g
npm uninstall webpack
```

## Datei package.json und Projektabhängigkeiten
  
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

## Semantische Versionierung mit Best Practice

Node.js Module verfolgen eine so genannte semantische Versionierung. Ein Modul hat eine Version im Format X.Y.Z (Major.Minor.Patch). Behebt der Entwickler einen Fehler, ohne die Abwärtskompatibilität zu beeinträchtigen, wird lediglich die Patchnummer um 1 erhöht. Fügt der Entwickler neue Funktionalität hinzu ohne Beeinträchtigung der Abwärtskompatibilität, wird die Minornummer um 1 erhöht. Beeinträchtigt der Entwickler die Abwärtskompatibilität, wird die Majornummer um 1 erhöht. Bei den Dependencies kann kann nicht nur exakte Versionen angeben, sondern auch Ranges und mehr. [npm semver calculator](http://semver.npmjs.com/) stellt eine interaktive "Spielwiese" dar, um dies auszuprobieren. Es wird schnell klar, wie man Major, Minor, Patch Versionen, Ranges oder exakte Versionen auswählen kann. Hier sind einige Beispiele:

```sh
"dependencies": {
  "package1": "1.0.0",         // exakte 1.0.0 Version
  "package2": "1.0.x",         // nur die Patch-Releases in Version 1.0
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

Oft wird es empfohlen, nur die Patch-Releases aktualisieren zu lassen. D.h. nur die Patchnummern sind variabel (beispielweise `1.0.x`). Damit werden böse Überraschungen vermieden, dass das Projekt plötzlich nicht gebaut werden kann. Das Problem liegt oft in den transitiven Abhängigkeiten. Angenommen, Ihr Modul `A` hängt vom Modul `B` ab und das Modul `B` hängt seinerseits vom Modul `C` ab. Angenommen, die Module `B` und `C` sind third-party Module, d.h. Sie haben keinen Einfluss darauf. Wird jetzt die Version des Moduls `C` geändert, kann der Build u.U. fehlschlagen, wenn sogar die Versionen der Modulen `A` und `B` nicht geändert wurden. Man kann die Gefahr eines fehlgeschlagenes Builds noch weiter minimieren, indem man [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) verwendet. Der Befehl

```sh
npm shrinkwrap
```

erlaubt die Versionen aller im Projekt benutzen Modulen mit ihren Abhängigkeiten unter `node_modules` "einzufrieren". Damit werden die Versionsänderungen sozusagen "gesperrt". Wie funktioniert das? Der Befehl `npm shrinkwrap` erzeugt die Datei `npm-shrinkwrap.json`, in der die exakten Versionen aller fürs Projekt installierten Modulen mit ihren Abhängigkeiten aufgelistet sind. Die Datei `npm-shrinkwrap.json` wird unter Versionskontrolle gestellt. Nun bekommen alle Teamkollegen genau die gleichen exakten Versionen aller Modulen mit ihren Abhängigkeiten, nachdem sie `npm install` ausgeführt haben.

## Nützliche NPM-Befehle

Weitere nützliche `npm` Befehle sind `ls`, `outdated` und `link`. Mit `ls` werden alle installierten lokalen oder globalen Module aufgelistet. Man kann dazu noch das Flag `-l` für die Ausgabe der kurzen Beschreibungen nutzen. Schreibt man `--depth=0`, werden nur noch die Top-Level Module und nicht der ganze Dependency-Baum aufgelistet.

```sh
npm ls -l --depth=0
npm ls -l --depth=0 -g
```

Die Ausgabe sieht ungefähr so aus:

```sh
+-- connect@3.4.1
|   High performance middleware framework
|   git+https://github.com/senchalabs/connect.git
|   https://github.com/senchalabs/connect#readme
+-- del@2.2.0
|   Delete files/folders using globs
|   git+https://github.com/sindresorhus/del.git
|   https://github.com/sindresorhus/del
+-- gulp-clean-css@2.0.7
|   Minify css with clean-css.
|   git+https://github.com/scniro/gulp-clean-css.git
|   https://github.com/scniro/gulp-clean-css#readme
+-- gulp-concat@2.6.0
|   Concatenates files
|   git+https://github.com/wearefractal/gulp-concat.git
|   https://github.com/wearefractal/gulp-concat#readme
```

Mit `outdated` wird geprüft welche lokale bzw. globale Module aktualisiert werden können.

```sh
npm outdated 
npm outdated -g --depth=0
```

Die Ausgabe sieht ungefähr so aus:

```sh
Package               Current  Wanted  Latest  Location
browser-sync           2.12.8  2.13.0  2.13.0  gulp-book
gulp            4.0.0-alpha.2     git     git  gulp-book
gulp-clean-css          2.0.7  2.0.10  2.0.10  gulp-book
run-sequence            1.1.5   1.2.1   1.2.1  gulp-book
serve-static           1.10.2  1.11.1  1.11.1  gulp-book
```

Wie schon erwähnt wurde, können outdated Module mit `npm update` aktualisiert werden. Wenn alles getestet ist und gut läuft, können Sie entscheiden, ob die Versionen in der `package.json` aktualisiert werden müssen. Nachdem die Versionen aktualisiert wurden, kann eine neue `npm-shrinkwrap.json` mit Hilfe von [shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap) (wie bereits gezeigt) erstellt und unter Versionskontrolle gestellt werden.

An dieser Stelle ist noch das [Package Linking](https://docs.npmjs.com/cli/link) mittels `npm link` zu erwähnen. Damit lassen sich Module verlinken. Angenommen, die Projektstruktur sieht folgendermaßen aus:

```sh
demo-project
    module-1
    module-2
```

Nun führen wir folgendes aus:

```sh
cd demo-project/module-2
npm link ../module-1
```

Wenn man jetzt Änderungen im `module-1` macht, werden sie automatisch in `module-2/node-modules/module-1` reflektiert. Aus dem Package `module-2` heraus lassen sich JavaScript Dateien im `module-1` ganz einfach importieren (hier als CommonJS Modul mit `require`):

```sh
var mod1 = require("module-1/somefile");
mod1.doSomething();
```

Alternativ geht es natürlich auch so:

```sh
var mod1 = require("./../module-1/somefile");
mod1.doSomething();
```

Zu beachten ist es, dass per Default die Datei-Endung `.js` angenommen wird. D.h. die folgenden Schreibweisen sind äquivalent:

```sh
require("./../module-1/somefile");
require("./../module-1/somefile.js");
```

## NPM Scripts als Build-Tools

Viele Aufgaben von Build-Tools wie Grunt oder Gulp können mit `npm` scripts ersetzt werden. Es handelt sich um ein Tag `scripts` in der `package.json` Datei. Alle Tools, die in `scripts` benutzt werden, müssen mit `--save-dev` installiert werden. Ein Beispiel:

```sh
npm install --save-dev node-sass
```

`node-sass` kompiliert SASS Dateien und erzeugt daraus CSS Dateien. Nun schreiben wir in der `package.json`:

```sh
"scripts": {
  "scss": "node-sass --output-style compressed -o dist/css src/scss"
}
```

und führen den folgenden Befehle in der Console aus:

```sh
npm run scss
```
 
Ergebnis: die SASS Dateien aus dem Verzeichnis `src/scss` werden nach CSS kompiliert und im `dist/css` abgelegt. Wie man sieht, hat jeder Befehl im `scripts` Tag einen Namen, eine Anweisung und kann mit

```sh
npm run <befehlsname>
```

ausgeführt werden. Wozu ist es gut? Damit wird eine Abstraktionsebene eingeführt, weil die Tools nicht direkt, sondern über die `scripts` Befehle angesprochen werden. Die Komplexität des Tools wird versteckt. Viele Tools verstehen auch die Datei-"globs", wie z.B. `*.js`, `*.min.css` oder `assets/*/*`. Ein Beispiel für Linting könnte so aussehen:

```sh
"devDependencies": {
  "jshint": "latest"
},
"scripts": {
  "lint": "jshint *.js"
}
```

Benutzung in der Console:

```sh
npm run lint
```

Die folgende Syntax kann bei den `scripts` Befehlen unabhängig vom Betriebssystem verwendet werden: 

* __&&__ für die sequenzielle Ausführung von Tasks (Verkettung von Tasks)
* __&__ für die parallele (gleichzeitige) Ausführung von Tasks
* __<__ um die Inhalte (stdin) einer Datei in einen Befehl einzufügen
* __>__ um den Output (stdout) eines Befehls weiterzuleiten und ihn in eine Datei einzufügen
* __|__ um den Output (stdout) eines Befehls weiterzuleiten und ihn an einen anderen Befehl zu senden

Eine weitere Möglichkeit sind die pre- oder post-hooks. Hat z.B. ein `scripts` Befehl den Namen `build`, wird der Befehl mit dem Namen `prebuild` davor und der Befehl mit dem Namen `postbuild` danach automatisch ausgeführt. Ein Beispiel soll das veranschaulichen:

```sh
"devDependencies": {
  "jshint": "latest",
  "stylus": "latest",
  "browserify": "latest"
},
"scripts": {
  "clean": "rimraf dist",
  "lint": "jshint **",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "build": "npm run clean && npm run build:css && npm run build:js",
  "prebuild:js": "npm run lint"
}
```

Im Beispiel führt `npm run build` die Befehle `clean`, `build:css` und `build:js` aus. Der Befehlt `build:js` wird aber ausgeführt, bevor der `lint` Befehl abgearbeitet ist.

Für die Überwachung von geänderten Dateien kann [watch](https://www.npmjs.com/package/watch) benutzt werden. Die folgende Konfiguration dient der Überwachung des ganzen Projektverzeichnisses. Ändert sich eine Datei, werden die HTML-, CSS- und JS-Assets neu gebildet. Man führt einfach `npm run build:watch` aus und fangt an zu entwickeln.

```sh
"devDependencies": {
  "stylus": "latest",
  "jade": "latest",
  "browserify": "latest",
  "watch": "latest",
},
"scripts": {
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "build:html": "jade assets/html/index.jade > dist/index.html",
  "build": "npm run build:js && npm run build:css && npm run build:html",
  "build:watch": "watch 'npm run build' .",
}
```

Die parallele Ausführung von Tasks / Prozessen in Form vom `cmd1 & cmd2 & cmd3` hat mehrere Nachteile. Für diese Aufgabe kann am besten [Parallelshell](https://www.npmjs.com/package/parallelshell) benutzt werden. Die Nachteile von `cmd1 & cmd2 & cmd3` werden auf der Homepage von [Parallelshell](https://www.npmjs.com/package/parallelshell) aufgezeigt.

```sh
"devDependencies": {
  ...
  "parallelshell": "latest"
},
"scripts": {
  "build:js": "browserify assets/scripts/main.js > dist/main.js",
  "watch:js": "watch 'npm run build:js' assets/scripts/",
  "build:css": "stylus assets/styles/main.styl > dist/main.css",
  "watch:css": "watch 'npm run build:css' assets/styles/",
  "build:html": "jade index.jade > dist/index.html",
  "watch:html": "watch 'npm run build:html' assets/html",
  "build": "npm run build:js && npm run build:css && npm run build:html",
  "build:watch": "parallelshell 'npm run watch:js' 'npm run watch:css' 'npm run watch:html'",
}
```

Jetzt führt der Aufruf von `npm run build:watch` die individuellen Watcher parallel aus. Wenn man z.B. nur CSS verändert, wird nur CSS neu kompiliert. Wenn man JavaScript verändert, wird nur JavaScript neu kompiliert und so weiter.

Es ist auch denkbar, einen Grunt oder Gulp basierten Build mit `scripts` zu triggern.

```sh
"scripts": {
  "build:prod": "gulp build --prod",
  "build:dev": "gulp build"
}
```