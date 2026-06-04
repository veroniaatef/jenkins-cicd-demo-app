pipeline {
    agent any

    environment {
        IMAGE_NAME = "jenkins-cicd-demo-app"
        CONTAINER_NAME = "jenkins-cicd-demo-container"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t %IMAGE_NAME% .'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                 docker stop $CONTAINER_NAME || true
                 docker rm $CONTAINER_NAME || true
                docker run -d -p $APP_PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed'
        }
    }
}