# Integration mit Maven

Generell gibt es zwei Deployment-Varianten.

1. Frontend Standalone
2. Frontent integriert in Backend

Bei der ersten Variante wird die Web-Anwendung Standalone deployt. Die statischen Web-Dateien (HTML, CSS, JavaScript, Bilder usw.) werden über einen Webserver direkt oder z.B. in einem Docker Image ausgeliefert. Eigenschaften dieser Variante:

- Eigenständige, unabhängige vom Backend, Releasezyklen möglich
- Frontend-Projekt kann separat deployt werden

Bei der zweiten Variante wird das Frontend-Projekt in ein Backend-Projekt integriert. Das Ziel dabei ist es, dass im Deployment-Artifakt des Backends die statischen Dateien des Frontends (Output vom `/dist` Ordner) integriert und danach über eine bestimmte URL auf dem Backend ausgeliefert werden. Eigenschaften dieser Variante:

- Gleiche Frontend und Backend Releasezyklen
- Gleiche Frontend und Backend Versionen
- Beide Projekte werden zusammen deployt, z.B. als WAR mit der Distribution des Frontends im Web-Resource-Ordner.

Die erste Deployment-Variante kann mit dem [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) gebaut werden. Dabei werden zwei Befehle hintereinander ausgeführt: `npm install` und `npm run <script>`. An der Stelle von `<script>` steht je nach Vorhaben ein `npm` Script-Befehl für einen Development- oder Release-Build. Für das [Demo Projekt](https://github.com/ova2/frontend-tooling-tutorial/tree/master/2-seed-project-setup) aus diesem GitHub-Repository würde der Script-Befehl entweder `build:dev` oder `build:prod` heißen. Die Wahl eines Script-Befehls kann über ein Maven-Profil gesteuert werden. Das Profil für die tägliche Entwicklung muss per Default aktiviert werden. Die relevante Konfiguration in der `pom.xml` Datei sieht wie folgt aus:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <artifactId>some-frontend-project</artifactId>
  <packaging>pom</packaging>
  ...
  <build>
    <plugins>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>1.5.0</version>
        <executions>
          <execution>
            <id>install-npm</id>
            <phase>generate-resources</phase>
            <goals>
              <goal>exec</goal>
            </goals>
            <configuration>
              <executable>npm</executable>
              <arguments>
                <argument>install</argument>
              </arguments>
            </configuration>
          </execution>
          <execution>
            <id>exec-build</id>
            <phase>prepare-package</phase>
            <goals>
              <goal>exec</goal>
            </goals>
            <configuration>
              <executable>npm</executable>
              <arguments>
                <argument>run</argument>
                <argument>${env.build}</argument>
              </arguments>
            </configuration>
          </execution>
        </executions>
      </plugin>
      
      <plugin>
        <!-- No java in this module -->
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <executions>
          <execution>
            <id>default-compile</id>
            <phase>none</phase>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
  
  <profiles>
    <!-- Profile for development build (activated per default) -->
    <profile>
      <id>development</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <env.build>build:dev</env.build>
      </properties>
    </profile>
        
    <!-- Profile for production build (Maven release plugin uses this profile automatically) -->
    <profile>
      <id>release</id>
      <activation>
        <property>
          <name>performRelease</name>
          <value>true</value>
        </property>
      </activation>
      <properties>
        <env.build>build:prod</env.build>
      </properties>
    </profile>
  </profiles>
</project>
```

Bei der zweiten Deployment-Variante muss die Konfiguration sowohl im Frontend- als auch im Backend-Projekt vorgenommen werden. Das Frontend-Projekt wird genauso wie bei der ersten Variante mit dem [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) gebaut. Der Unterschied besteht darin, dass jetzt ein Maven-Artefakt erzeugt werden muss, damit es dem Buildprozess des Backend-Projektes zur Verfügung steht. D.h. der Build muss paketiert werden. Das [Maven Assembly Plugin](http://maven.apache.org/plugins/maven-assembly-plugin/) hilft uns dabei diese Aufgabe zu meistern. Angenommen, der Frontend-Build erstellt eine Distribution im Verzeichnis `target/dist` unter dem Projekt-Wurzelverzeichnis. Das Maven Assembly Plugin baut aus dem `target/dist` Ordner ein `tar.gz` Archiv. Die oben gezeigte Konfiguration muss um den folgenden Abschnitt erweitert werden:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-assembly-plugin</artifactId>
  <version>2.6</version>
  <executions>
    <execution>
      <id>create-tarball</id>
      <phase>package</phase>
      <goals>
        <goal>single</goal>
      </goals>
      <configuration>
        <descriptors>
          <descriptor>assembly.xml</descriptor>
        </descriptors>
        <appendAssemblyId>false</appendAssemblyId>
      </configuration>
    </execution>
  </executions>
</plugin>
```

Das Paketieren ist in der Datei `assembly.xml` definiert.

```xml
<assembly>
  <id>assembly</id>
  <formats>
    <format>tar.gz</format>
  </formats>
  <includeBaseDirectory>false</includeBaseDirectory>
  <fileSets>
    <fileSet>
      <directory>${project.build.directory}/dist</directory>
      <outputDirectory>/</outputDirectory>
    </fileSet>
  </fileSets>
</assembly>
```

Das Backend-Projekt muss zuerst das `tar.gz` Archiv entpacken. Das geschieht in der `pom.xml` des Backend-Projektes mit Hilfe von [Maven Dependency Plugin](http://maven.apache.org/plugins/maven-dependency-plugin/). Die entsprechende Konfiguration sieht folgendermaßen aus:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-dependency-plugin</artifactId>
  <version>2.10</version>
  <executions>
    <execution>
      <id>unpack</id>
      <phase>generate-sources</phase>
      <goals>
        <goal>unpack-dependencies</goal>
      </goals>
      <configuration>
        <includeTypes>tar.gz</includeTypes>
        <includeArtifactIds>some-frontend-project</includeArtifactIds>
        <outputDirectory>${project.build.directory}/frontend-dist</outputDirectory>
      </configuration>
    </execution>
  </executions>
</plugin>
```

Angenommen, die Web-Applikation wird als WAR-Datei gebaut und deployet. Die entpackte Frontend-Distribution kann zuerst mit Hilfe von [Maven Resources Plugin](https://maven.apache.org/plugins/maven-resources-plugin/) nach beispielsweise `src/main/webapp` kopiert werden. Danach erzeugt das [Maven WAR Plugin](http://maven.apache.org/plugins/maven-war-plugin/) eine WAR-Datei. Vereinfacht sieht die relevante POM-Konfiguration des Backend-Projektes ungefähr so aus (um die Idee zu verdeutlichen):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  ...
  <artifactId>some-backend-project</artifactId>
  <packaging>war</packaging>
  ...
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-dependency-plugin</artifactId>
        <version>2.10</version>
        <executions>
          <execution>
            <id>unpack</id>
            <phase>generate-sources</phase>
            <goals>
              <goal>unpack-dependencies</goal>
            </goals>
            <configuration>
              <includeTypes>tar.gz</includeTypes>
              <includeArtifactIds>some-frontend-project</includeArtifactIds>
              <outputDirectory>${project.build.directory}/frontend-dist</outputDirectory>
            </configuration>
          </execution>
        </executions>
      </plugin>

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-resources-plugin</artifactId>
        <version>3.0.1</version>
        <executions>
          <execution>
            <id>copy-resources-src</id>
            <phase>process-resources</phase>
            <goals>
              <goal>copy-resources</goal>
            </goals>
            <configuration>
              <outputDirectory>${project.basedir}/src/main/webapp</outputDirectory>
              <resources>
                <resource>
                  <directory>${project.build.directory}/frontend-dist</directory>
                </resource>
              </resources>
            </configuration>
          </execution>
        </executions>
      </plugin>

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-war-plugin</artifactId>
        <version>2.6</version>
      </plugin>
    </plugins>
  </build>
</project>
```


