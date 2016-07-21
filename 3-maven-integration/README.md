# Integration mit Maven

Generell gibt es zwei Deployment-Varianten.

1. Frontend Standalone
2. Frontent integriert in Backend

Bei der ersten Variante wird die Web-Anwendung Standalone deployt. Die statischen Web-Dateien (HTML, CSS, JavaScript, Bilder usw.) werden über einen Webserver direkt oder z.B. in einem Docker Image ausgeliefert. Eigenschaften dieser Variante:

- Eigene, unabhängige vom Backend, Releasezyklen möglich
- Web-Projekt kann separat deployt werden

Bei der zweiten Variante wird das Frontend-Projekt in ein Backend-Projekt integriert. Das Ziel dabei ist es, dass im Deployment-Artifakt des Backends die statischen Dateien des Frontends (Output vom `/dist` Ordner) integriert und danach über eine bestimmte URL auf dem Backend ausgeliefert werden. Eigenschaften dieser Variante:

- Gleiche Frontend und Backend Releasezyklen
- Gleiche Frontend und Backend Versionen
- Beide Projekte werden zusammen deployt, z.B. als WAR mit der Distribution des Frontends im Web-Resource-Ordner.

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>1.4.0</version>
                <executions>
                    <execution>
                        <id>install-npm-packages</id>
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
                    <!-- Gulp-Task welcher den build ausführt -->
                    <execution>
                        <id>exec-gulp-build</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>exec</goal>
                        </goals>
                        <configuration>
                            <executable>gulp</executable>
                            <arguments>
                                <argument>build</argument>
                                <argument>--dev</argument>
                                <argument>${env.dev}</argument>
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
        <!-- Profile für einen normalen Development-Build -->
        <profile>
            <id>generate-style</id>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
            <properties>
                <env.dev>true</env.dev>
            </properties>
        </profile>

        <!-- Profile für die Produktion (Maven Release-Plugin liest dies automatisch ein) -->
        <profile>
            <id>release</id>
            <activation>
                <property>
                    <name>performRelease</name>
                    <value>true</value>
                </property>
            </activation>
            <properties>
                <env.dev>false</env.dev>
            </properties>
        </profile>
    </profiles>
</project>
```




