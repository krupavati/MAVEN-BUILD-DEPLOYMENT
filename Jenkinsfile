pipeline{
    agent any
    tools{
        maven 'mymaven'
    }
    stages{
        stage ('Git-Checkout'){
            steps{
                git 'https://github.com/krupavati/MAVEN-BUILD-DEPLOYMENT.git'
                echo "Git-Checkout successful";
            }
        }
        stage ('SonarQube-Analysis'){
            steps{
                script {
                    def scannerHome = tool 'SonarQube Scanner'

                    withSonarQubeEnv('SonarQube Scanner'){

                    // Set SonarQube properties
                    def sonarProperties = [
                        "-Dsonar.projectKey=demo-analysis",
                        "-Dsonar.projectName=My project1",
                        "-Dsonar.projectVersion=1.0",
                        "-Dsonar.sources=.",
                        "-Dsonar.sourceEncoding=UTF-8",
                        "-Dsonar.host.url=http://52.66.172.219:9000/",
                        "-Dsonar.login= admin",
                        "-Dsonar.password=sonar"
                    ]

                    // Run SonarQube Scanner
                    sh "${scannerHome}/bin/sonar-scanner ${sonarProperties.join(' ')}"
                }
                }

            }
        }
        stage ('Build'){
            steps{
                sh 'mvn clean package'
            }
            post{
                success{
                    echo "Archiving the Artifacts"
                    archiveArtifacts artifacts: '**/target/*.war'
                }
            }
        } 
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }   
        stage ('Deploy to tomcat server') {
            steps{
                deploy adapters: [tomcat9(credentialsId: 'deployer_user', path: '', url: 'http://65.2.181.199:8080/')], contextPath: null, war: '**/*.war'
            }
        }
        
    }
}
