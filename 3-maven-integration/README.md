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
<project ...>
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

Bei der zweiten Deployment-Variante muss die Konfiguration sowohl im Frontend- als auch im Backend-Projekt vorgenommen werden. Das Frontend-Projekt wird genauso wie bei der ersten Variante mit dem [Exec Maven Plugin](http://www.mojohaus.org/exec-maven-plugin/) gebaut. Der Unterschied besteht darin, dass jetzt ein Maven-Artefakt erzeugt werden muss, damit es dem Buildprozess des Backend-Projektes zur Verfügung steht.


