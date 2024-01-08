pipeline{
    agent any
    tools{
        maven 'mymaven'
    }
    stages{
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
        stage ('Deploy to tomcat server') {
            steps{
                deploy adapters: [tomcat9(credentialsId: 'deployer_user', path: '', url: 'http://13.233.168.59:8080/')], contextPath: null, war: '**/*.war'
            }
        }
        
    }
}
